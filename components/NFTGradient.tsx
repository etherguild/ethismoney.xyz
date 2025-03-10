import { useEffect, useRef } from 'react';
import { NFTTier } from '../types/nft';

interface NFTGradientProps {
  tier: NFTTier;
  isActive: boolean;
  isHovered: boolean;
  isDesktop: boolean;
  containerRef: HTMLDivElement | null;
}

const NFTGradient: React.FC<NFTGradientProps> = ({
  tier,
  isActive,
  isHovered,
  isDesktop,
  containerRef
}) => {
  const gradientRef = useRef<HTMLDivElement | null>(null);

  // Handle basic opacity and scale
  useEffect(() => {
    if (!gradientRef.current) return;

    const gradient = gradientRef.current;
    const opacity = isActive ? '1' : isHovered ? '0.85' : '0.7';
    const scale = isActive ? '1.05' : isHovered ? '1.02' : '1';

    gradient.style.opacity = opacity;
    gradient.style.transform = `scale(${scale})`;
  }, [isActive, isHovered]);

  // Handle mouse/touch movement for interactive gradient
  useEffect(() => {
    if (!containerRef || !gradientRef.current) return;

    const gradient = gradientRef.current;

    const updateGradientPosition = (x: number, y: number) => {
      const rect = containerRef.getBoundingClientRect();
      const xPercent = Math.round(((x - rect.left) / rect.width) * 100);
      const yPercent = Math.round(((y - rect.top) / rect.height) * 100);

      gradient.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
        ${tier.backgroundColors[0]} 0%, 
        ${tier.backgroundColors[1]} 75%)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateGradientPosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateGradientPosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateGradientPosition(touch.clientX, touch.clientY);
      }
    };

    // Add event listeners
    containerRef.addEventListener('mousemove', handleMouseMove);
    containerRef.addEventListener('touchmove', handleTouchMove);
    containerRef.addEventListener('touchstart', handleTouchStart);

    return () => {
      containerRef.removeEventListener('mousemove', handleMouseMove);
      containerRef.removeEventListener('touchmove', handleTouchMove);
      containerRef.removeEventListener('touchstart', handleTouchStart);
    };
  }, [containerRef, tier.backgroundColors]);

  return (
    <div
      ref={gradientRef}
      data-tier-index={tier.tier - 1}
      className="absolute inset-0 w-full h-full rounded-[20px] transition-all duration-700"
      style={{
        background: `radial-gradient(circle at ${isActive ? '50% 50%' : 'top right'}, ${tier.backgroundColors[0]} 0%, ${tier.backgroundColors[1]} 75%)`,
        animation: 'pulseGradient 8s infinite alternate ease-in-out'
      }}
    />
  );
};

export default NFTGradient; 