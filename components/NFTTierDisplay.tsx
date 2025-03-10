import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import NFTVideo from './NFTVideo';
import NFTGradient from './NFTGradient';
import NFTParticles from './NFTParticles';
import { NFT_TIERS } from '../constants/nft';
import type { NFTTier } from '../types/nft';

const NFTTierDisplay = () => {
  const [activeTier, setActiveTier] = useState<number>(0);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [syncTime, setSyncTime] = useState<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check viewport size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active video time for syncing
  useEffect(() => {
    const activeVideo = videoRefs.current[activeTier];
    if (!activeVideo) return;

    const updateTime = () => {
      setSyncTime(activeVideo.currentTime);
    };

    activeVideo.addEventListener('timeupdate', updateTime);
    return () => activeVideo.removeEventListener('timeupdate', updateTime);
  }, [activeTier]);

  // On mobile, preload all videos
  useEffect(() => {
    if (isDesktop) return;

    // Make sure all videos are loaded and synced
    NFT_TIERS.forEach((_, index) => {
      const video = videoRefs.current[index];
      if (!video) return;

      if (video.paused) {
        video.play().catch(() => {
          // Handle autoplay restrictions silently
        });
      }
    });
  }, [isDesktop]);

  const renderMobileView = () => (
    <div className="w-full flex flex-col gap-y-[10px] items-center">
      <div className="w-full max-w-[372px] flex justify-evenly items-center">
        <NavigationButton
          direction="left"
          onClick={() => setActiveTier((prev) => (prev - 1 + NFT_TIERS.length) % NFT_TIERS.length)}
        />

        {/* Mobile: Render all tiers but only show active one */}
        <div className="relative w-[200px] h-[200px]">
          {NFT_TIERS.map((tier, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${activeTier === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <NFTCard
                tier={tier}
                isActive={index === activeTier}
                isHovered={false}
                isDesktop={false}
                className="w-full h-full"
                onVideoRef={(ref) => { videoRefs.current[index] = ref; }}
                syncTime={syncTime}
                containerRef={containerRefs.current[index]}
              />
            </div>
          ))}
        </div>

        <NavigationButton
          direction="right"
          onClick={() => setActiveTier((prev) => (prev + 1) % NFT_TIERS.length)}
        />
      </div>

      <TierInfo tier={NFT_TIERS[activeTier]} isActive={true} />
    </div>
  );

  const renderDesktopView = () => (
    <div className="flex justify-evenly h-[413px]">
      {NFT_TIERS.map((tier, index) => (
        <div
          key={index}
          ref={el => { containerRefs.current[index] = el; }}
          className="flex flex-col gap-[10px] items-center justify-center"
          onMouseEnter={() => setHoveredTier(index)}
          onMouseLeave={() => setHoveredTier(null)}
          onClick={() => setActiveTier(index)}
        >
          <div className={`relative flex items-center justify-center`}>
            <NFTCard
              tier={tier}
              isActive={index === activeTier}
              isHovered={index === hoveredTier}
              isDesktop={true}
              className={`${index === activeTier ? 'size-[325px]' : 'size-[200px]'} cursor-pointer transition-all duration-300`}
              onVideoRef={(ref) => { videoRefs.current[index] = ref; }}
              syncTime={syncTime}
              containerRef={containerRefs.current[index]}
            />
          </div>

          <TierInfo tier={tier} isActive={index === activeTier} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      {isDesktop ? renderDesktopView() : renderMobileView()}

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
      `}</style>
    </div>
  );
};

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-[45px] h-[35px] border border-blue1 rounded-full z-10"
  >
    <Icon
      icon={`feather:chevron-${direction}`}
      className="size-[15px] text-blue1"
    />
  </button>
);

interface NFTCardProps {
  tier: NFTTier;
  isActive: boolean;
  isHovered: boolean;
  isDesktop: boolean;
  className?: string;
  onVideoRef?: (ref: HTMLVideoElement | null) => void;
  syncTime?: number;
  containerRef: HTMLDivElement | null;
}

const NFTCard: React.FC<NFTCardProps> = ({
  tier,
  isActive,
  isHovered,
  isDesktop,
  className,
  onVideoRef,
  syncTime,
  containerRef
}) => (
  <div className={`relative overflow-hidden rounded-[20px] group transition-all duration-500 ease-in-out ${className}`}>
    <NFTGradient
      tier={tier}
      isActive={isActive}
      isHovered={isHovered}
      isDesktop={isDesktop}
      containerRef={containerRef}
    />

    <NFTVideo
      tier={tier}
      isActive={isActive}
      isHovered={isHovered}
      isDesktop={isDesktop}
      onVideoRef={onVideoRef}
      syncTime={syncTime}
    />

    <NFTParticles isHovered={isHovered} />

    {isHovered && (
      <div
        className="absolute inset-0 z-[3] rounded-[20px] opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${tier.backgroundColors[0]}80 0%, transparent 70%)`,
          filter: 'blur(15px)'
        }}
      />
    )}
  </div>
);

interface TierInfoProps {
  tier: NFTTier;
  isActive: boolean;
}

const TierInfo: React.FC<TierInfoProps> = ({ tier, isActive }) => (
  <>
    <div className="text-md">
      {tier.title}
    </div>

    {/* {isActive ? ( */}
    <div className={`py-[10px] px-[25px] ${isActive ? 'bg-[#B7DDE8]' : 'bg-transparent'} rounded-full flex justify-center items-center w-full max-w-[325px] duration-300`}>
      <div className={`${isActive ? 'headline-md' : 'text-xs'} duration-500`}>
        Donate {tier.price} ETH
      </div>
    </div>
    {/* ) : (
      <div className="text-[#2A6F97] text-[12px] font-normal font-manrope">
        Donate {tier.price} ETH
      </div>
    )} */}
  </>
);

export default NFTTierDisplay;