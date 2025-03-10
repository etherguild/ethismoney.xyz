import { NFTTier } from "../types/nft";

export const NFT_TIERS: NFTTier[] = [
  {
    tier: 1,
    title: "Tier 1",
    price: "0.1",
    videoWebm: "/nfts/tier-1.webm",
    videoMp4: "/nfts/tier-1.mp4",
    backgroundColors: ["#92B5CB", "#24618A"],
  },
  {
    tier: 2,
    title: "Tier 2",
    price: "1",
    videoWebm: "/nfts/tier-2.webm",
    videoMp4: "/nfts/tier-2.mp4",
    backgroundColors: ["#94AEC4", "#245180"],
  },
  {
    tier: 3,
    title: "Tier 3",
    price: "10",
    videoWebm: "/nfts/tier-3.webm",
    videoMp4: "/nfts/tier-3.mp4",
    backgroundColors: ["#96AABB", "#1C4060"],
  },
  {
    tier: 4,
    title: "Tier 4",
    price: "100",
    videoWebm: "/nfts/tier-4.webm",
    videoMp4: "/nfts/tier-4.mp4",
    backgroundColors: ["#D2D6DD", "#172F4C"],
  },
];
