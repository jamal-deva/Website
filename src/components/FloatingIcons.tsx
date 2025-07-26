import React, { useEffect, useState } from "react";

const fixedIconPositions = [
  { src: "/floating-icons/After_Effects.svg", top: "10%", left: "15%" },
  { src: "/floating-icons/Photoshop.svg", top: "30%", left: "80%" },
  { src: "/floating-icons/timeline.svg", top: "40%", left: "90%" },
  { src: "/floating-icons/pr.svg", top: "10%", left: "76%" },
  { src: "/floating-icons/davenci.svg", top: "30%", left: "15%" },
  { src: "/floating-icons/movie.svg", top: "60%", left: "25%" },
  { src: "/floating-icons/trim.svg", top: "55%", left: "75%" },
  { src: "/floating-icons/video.svg", top: "45%", left: "10%" },
  { src: "/floating-icons/Pen.svg", top: "47%", left: "68%" },
  { src: "/floating-icons/Crop.svg", top: "40%", left: "30%" },
  { src: "/floating-icons/Folder.svg", top: "15%", left: "85%" },
];

const FloatingIcons: React.FC = () => {
  const [scrollY, setScrollY] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          // Hide icons when scrolled past hero section for better performance
          setIsVisible(window.scrollY < window.innerHeight);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile);
    checkMobile(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Reduce number of icons on mobile
  const iconsToShow = isMobile ? fixedIconPositions.slice(0, 6) : fixedIconPositions;

  if (!isVisible) return null;

  return (
    <div
      className="floating-icons"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        transform: `translate3d(0, ${scrollY * -0.5}px, 0)`,
        willChange: "transform",
      }}
    >
      {iconsToShow.map((icon, i) => {
        const rotation = (Math.random() * 10 - 5).toFixed(2);
        const scale = isMobile ? (0.6 + Math.random() * 0.3).toFixed(2) : (0.8 + Math.random() * 0.4).toFixed(2);

        return (
          <img
            key={i}
            src={icon.src}
            className="floating-icon"
            style={{
              position: "absolute",
              top: icon.top,
              left: icon.left,
              width: isMobile ? "30px" : "40px",
              opacity: 100,
              transform: `translate3d(0, 0, 0) rotate(${rotation}deg) scale(${scale})`,
              filter: isMobile ? "blur(0.5px) drop-shadow(0 0 4px rgba(59, 130, 246, 0.2))" : "blur(1px) drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))",
              animation: `floatY ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0}s`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingIcons;
