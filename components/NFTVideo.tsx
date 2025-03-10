import { useEffect, useRef } from 'react';
import { NFTTier } from '../types/nft';

interface NFTVideoProps {
  tier: NFTTier;
  isActive: boolean;
  isHovered: boolean;
  isDesktop: boolean;
  onVideoRef?: (ref: HTMLVideoElement | null) => void;
  syncTime?: number;
}

const NFTVideo: React.FC<NFTVideoProps> = ({
  tier,
  isActive,
  isHovered,
  isDesktop,
  onVideoRef,
  syncTime
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Register video ref with parent
  useEffect(() => {
    if (onVideoRef && videoRef.current) {
      onVideoRef(videoRef.current);
    }
  }, [onVideoRef]);

  // Handle playback states
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Always play videos, just adjust speed
    if (isActive) {
      video.playbackRate = 1.0;
    } else if (isDesktop && isHovered) {
      video.playbackRate = 0.5;
    } else {
      video.playbackRate = 1.0;
    }

    // Always try to play the video
    video.play().catch(() => {
      // Handle autoplay restrictions silently
    });
  }, [isActive, isHovered, isDesktop]);

  // Handle time syncing for consistent playback
  // useEffect(() => {
  //   if (!videoRef.current || syncTime === undefined) return;

  //   const video = videoRef.current;

  //   const syncDiff = video.currentTime - syncTime;
  //   // Only sync if difference is significant
  //   if (Math.abs(syncDiff) > 0.5) {

  //     video.currentTime = syncTime;
  //   }
  // }, [syncTime]);

  return (
    <video
      ref={videoRef}
      className={`absolute w-full h-full object-contain z-[1] transition-opacity duration-300 ${!isDesktop && !isActive ? 'opacity-0' : 'opacity-100'
        }`}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={tier.videoWebm} type="video/webm" />
      <source src={tier.videoMp4} type="video/mp4" />
    </video>
  );
};

export default NFTVideo; 