interface NFTParticlesProps {
  isHovered?: boolean;
}

const NFTParticles: React.FC<NFTParticlesProps> = ({ isHovered }) => {
  return (
    <div className={`absolute inset-0 ${isHovered ? 'opacity-40' : 'opacity-20'} z-[2] pointer-events-none transition-opacity duration-500`}>
      <div className="particle-1 absolute w-2.5 h-2.5 rounded-full bg-white/50 left-1/4 top-1/2" />
      <div className="particle-2 absolute w-4 h-4 rounded-full bg-white/50 left-[60%] top-[70%]" />
      <div className="particle-3 absolute w-2 h-2 rounded-full bg-white/50 left-[40%] top-[30%]" />

      <style jsx>{`
        .particle-1 {
          animation: float 7s infinite linear;
        }
        
        .particle-2 {
          animation: float 9s infinite linear;
        }
        
        .particle-3 {
          animation: float 6s infinite linear;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-30px) translateX(20px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NFTParticles; 