export interface NFTTier {
  tier: number;
  title: string;
  price: string;
  videoWebm: string;
  videoMp4: string;
  backgroundColors: [string, string];
}

export interface VideoRefState {
  ref: HTMLVideoElement | null;
  play: () => void;
  pause: () => void;
  setPlaybackRate: (rate: number) => void;
  resetToStart: () => void;
}

export interface GradientRefState {
  ref: HTMLDivElement | null;
  updatePosition: (x: number, y: number) => void;
  setOpacity: (opacity: number) => void;
  setScale: (scale: number) => void;
}
