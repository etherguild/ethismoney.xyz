import { useState, useEffect, useRef } from 'react';

const tiers = [
  {
    tier: 1,
    title: "Tier 1",
    price: "0.1",
    videoWebm: "/nfts/tier-1.webm",
    videoMp4: "/nfts/tier-1.mp4",
    backgroundColors: ["#92B5CB", "#24618A"]
  },
  {
    tier: 2,
    title: "Tier 2",
    price: "1",
    videoWebm: "/nfts/tier-2.webm",
    videoMp4: "/nfts/tier-2.mp4",
    backgroundColors: ["#94AEC4", "#245180"]
  },
  {
    tier: 3,
    title: "Tier 3",
    price: "10",
    videoWebm: "/nfts/tier-3.webm",
    videoMp4: "/nfts/tier-3.mp4",
    backgroundColors: ["#96AABB", "#1C4060"]
  },
  {
    tier: 4,
    title: "Tier 4",
    price: "100",
    videoWebm: "/nfts/tier-4.webm",
    videoMp4: "/nfts/tier-4.mp4",
    backgroundColors: ["#D2D6DD", "#172F4C"]
  }
];

const NFTTierDisplay = () => {
  const [activeTier, setActiveTier] = useState<number>(0);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const gradientRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Check if desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle desktop video playback based on active and hovered tiers
  useEffect(() => {
    if (!isDesktop) return;

    videoRefs.current.forEach((videoRef, index) => {
      if (!videoRef) return;

      if (index === activeTier) {
        // Active tier plays at normal speed
        videoRef.playbackRate = 1.0;
        if (videoRef.paused) videoRef.play();
      } else if (index === hoveredTier) {
        // Hovered tier plays at slow speed
        videoRef.playbackRate = 0.5;
        if (videoRef.paused) videoRef.play();
      } else {
        // Non-active, non-hovered tiers are paused
        if (!videoRef.paused) videoRef.pause();
        // Reset to first frame
        videoRef.currentTime = 0;
      }
    });
  }, [activeTier, hoveredTier, isDesktop]);

  // Handle mobile video source change
  useEffect(() => {
    if (isDesktop || !mobileVideoRef.current) return;

    const currentTier = tiers[activeTier];

    // Explicitly update the src attributes and load the new video
    const videoElement = mobileVideoRef.current;

    // Find and update/create the webm source
    let webmSource = videoElement.querySelector('source[type="video/webm"]') as HTMLSourceElement | null;
    if (!webmSource) {
      webmSource = document.createElement('source') as HTMLSourceElement;
      webmSource.type = 'video/webm';
      videoElement.appendChild(webmSource);
    }
    webmSource.src = currentTier.videoWebm;

    // Find and update/create the mp4 source
    let mp4Source = videoElement.querySelector('source[type="video/mp4"]') as HTMLSourceElement | null;
    if (!mp4Source) {
      mp4Source = document.createElement('source') as HTMLSourceElement;
      mp4Source.type = 'video/mp4';
      videoElement.appendChild(mp4Source);
    }
    mp4Source.src = currentTier.videoMp4;

    // Load and play the new video
    videoElement.load();
    videoElement.play();
  }, [activeTier, isDesktop]);

  // Animate the active gradient
  useEffect(() => {
    gradientRefs.current.forEach((gradientRef, index) => {
      if (!gradientRef) return;

      if (index === activeTier) {
        gradientRef.style.opacity = '1';
        if (isDesktop) {
          gradientRef.style.transform = 'scale(1.05)';
        }
      } else if (isDesktop && index === hoveredTier) {
        gradientRef.style.opacity = '0.85';
        gradientRef.style.transform = 'scale(1.02)';
      } else {
        if (isDesktop) {
          gradientRef.style.opacity = '0.7';
          gradientRef.style.transform = 'scale(1)';
        } else {
          gradientRef.style.opacity = '0';
        }
      }
    });
  }, [activeTier, hoveredTier, isDesktop]);

  const handleMouseMove = (e, containerEl, gradientEl) => {
    if (!containerEl || !gradientEl) return;

    const rect = containerEl.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    // Calculate position as percentage
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);

    // Update the gradient position
    gradientEl.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      ${tiers[parseInt(gradientEl.dataset.tierIndex)].backgroundColors[0]} 0%, 
      ${tiers[parseInt(gradientEl.dataset.tierIndex)].backgroundColors[1]} 75%)`;
  };

  // Navigation functions
  const nextTier = () => {
    setActiveTier((prev) => (prev + 1) % tiers.length);
  };

  const prevTier = () => {
    setActiveTier((prev) => (prev - 1 + tiers.length) % tiers.length);
  };

  return (
    <div className="w-full">
      {/* Mobile Carousel View */}
      <div className={`w-full flex flex-col items-center ${isDesktop ? 'hidden' : 'block'}`}>
        <div className="w-full max-w-[372px] flex justify-evenly items-center">
          {/* Left Arrow */}
          <button onClick={prevTier} className="flex items-center justify-center w-[45px] h-[36px] border border-[#2A6F97] rounded-[17.25px] z-10">
            <svg width="24" height="24" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-50">
              <path fillRule="evenodd" clipRule="evenodd" d="M24.8169 22.3213C24.5729 22.5654 24.1771 22.5654 23.9331 22.3213L20.1831 18.5713C19.939 18.3273 19.939 17.9315 20.1831 17.6875L23.9331 13.9375C24.1771 13.6934 24.5729 13.6934 24.8169 13.9375C25.061 14.1815 25.061 14.5773 24.8169 14.8213L21.5089 18.1294L24.8169 21.4375C25.061 21.6815 25.061 22.0773 24.8169 22.3213Z" fill="#1B3555" />
            </svg>
          </button>

          {/* Current NFT Video with Animated Background */}
          <div className="relative w-[200px] h-[200px] rounded-[20px] overflow-hidden">
            {/* Animated Gradient Background */}
            <div
              ref={el => { gradientRefs.current[activeTier] = el; }}
              data-tier-index={activeTier}
              className="absolute inset-0 w-full h-full rounded-[20px] transition-all duration-700"
              style={{
                background: `radial-gradient(circle at top right, ${tiers[activeTier].backgroundColors[0]} 0%, ${tiers[activeTier].backgroundColors[1]} 75%)`,
                animation: 'pulseGradient 8s infinite alternate ease-in-out'
              }}
            ></div>

            {/* Video Layer */}
            <video
              ref={mobileVideoRef}
              className="absolute w-full h-full object-contain z-[1]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={tiers[activeTier].videoWebm} type="video/webm" />
              <source src={tiers[activeTier].videoMp4} type="video/mp4" />
            </video>

            {/* Subtle Floating Particles */}
            <div className="absolute inset-0 opacity-30 z-[2] pointer-events-none">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
            </div>
          </div>

          {/* Right Arrow */}
          <button onClick={nextTier} className="flex items-center justify-center w-[45px] h-[36px] border border-[#2A6F97] rounded-[17.25px] z-10">
            <svg width="24" height="24" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-50">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.1831 13.9375C20.4271 13.6934 20.8229 13.6934 21.0669 13.9375L24.8169 17.6875C25.061 17.9315 25.061 18.3273 24.8169 18.5713L21.0669 22.3213C20.8229 22.5654 20.4271 22.5654 20.1831 22.3213C19.939 22.0773 19.939 21.6815 20.1831 21.4375L23.4911 18.1294L20.1831 14.8213C19.939 14.5773 19.939 14.1815 20.1831 13.9375Z" fill="#1B3555" />
            </svg>
          </button>
        </div>

        {/* Tier Title and Button */}
        <div className="text-center text-[#1B3555] text-[18px] font-semibold font-manrope mt-[10px]">
          {tiers[activeTier].title}
        </div>
        <div className="w-fit max-w-[372px] mt-[10px] px-[25px] py-[10px] bg-[#B7DDE8] rounded-full flex justify-center items-center">
          <div className="text-[#1B3555] text-[18px] font-semibold font-manrope">
            Donate {tiers[activeTier].price} ETH
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className={`${isDesktop ? 'flex' : 'hidden'} justify-between items-center mt-[20px]`}>
        {tiers.map((tier, index) => (
          <div
            key={index}
            ref={el => { containerRefs.current[index] = el; }}
            className={`flex flex-col gap-[10px] items-center cursor-pointer transition-all duration-300`}
            onMouseEnter={() => setHoveredTier(index)}
            onMouseLeave={() => setHoveredTier(null)}
            onMouseMove={(e) => handleMouseMove(e, containerRefs.current[index], gradientRefs.current[index])}
            onClick={() => setActiveTier(index)}
          >
            <div
              className={`relative overflow-hidden rounded-[20px] group transition-all duration-500 ease-in-out ${index === activeTier ? 'w-[325px] h-[325px]' : 'w-[200px] h-[200px]'
                }`}
            >
              {/* Animated Gradient Background */}
              <div
                ref={el => { gradientRefs.current[index] = el; }}
                data-tier-index={index}
                className="absolute inset-0 w-full h-full rounded-[20px] transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at top right, ${tier.backgroundColors[0]} 0%, ${tier.backgroundColors[1]} 75%)`,
                  opacity: index === activeTier ? 1 : 0.7,
                  animation: 'pulseGradient 8s infinite alternate ease-in-out'
                }}
              ></div>

              {/* Video Layer */}
              <video
                ref={el => { videoRefs.current[index] = el; }}
                className="absolute w-full h-full object-contain z-[1] transition-all duration-300"
                autoPlay={index === activeTier}
                loop
                muted
                playsInline
              >
                <source src={tier.videoWebm} type="video/webm" />
                <source src={tier.videoMp4} type="video/mp4" />
              </video>

              {/* Subtle Floating Particles */}
              <div className="absolute inset-0 opacity-20 z-[2] pointer-events-none group-hover:opacity-40 transition-opacity duration-500">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>

              {/* Highlight Glow Effect on Hover */}
              <div
                className={`absolute inset-0 z-[3] rounded-[20px] transition-opacity duration-500 ${index === hoveredTier ? 'opacity-40' : 'opacity-0'
                  }`}
                style={{
                  background: `radial-gradient(circle at center, ${tier.backgroundColors[0]}80 0%, transparent 70%)`,
                  filter: 'blur(15px)'
                }}
              ></div>
            </div>

            <div className="text-center text-[#1B3555] text-[18px] font-semibold font-manrope">
              {tier.title}
            </div>

            {/* Button for active tier, text for others */}
            {index === activeTier ? (
              <div className="w-[325px] py-[10px] px-[25px] bg-[#B7DDE8] rounded-full flex justify-center items-center">
                <div className="text-[#1B3555] text-[18px] font-semibold font-manrope">
                  Donate {tier.price} ETH
                </div>
              </div>
            ) : (
              <div className="text-[#2A6F97] text-[12px] font-normal font-manrope">
                Donate {tier.price} ETH
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulseGradient {
          0% {
            background-position: 0% 50%;
            transform: scale(1);
          }
          50% {
            background-position: 100% 50%;
            transform: scale(1.05);
          }
          100% {
            background-position: 0% 50%;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-30px) translateX(20px) rotate(360deg); opacity: 0; }
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        
        .particle-1 {
          width: 10px;
          height: 10px;
          left: 25%;
          top: 50%;
          animation: float 7s infinite linear;
        }
        
        .particle-2 {
          width: 15px;
          height: 15px;
          left: 60%;
          top: 70%;
          animation: float 9s infinite linear;
        }
        
        .particle-3 {
          width: 8px;
          height: 8px;
          left: 40%;
          top: 30%;
          animation: float 6s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default NFTTierDisplay;