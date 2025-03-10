import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useState } from "react";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Debounce utility
export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Shared hook for scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => setScrollY(window.scrollY), 10);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

// Shared hook for responsive design
export function useResponsive(breakpoint: number) {
  const [isMobile, setIsMobile] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= breakpoint);
    };

    const handleResize = debounce(() => {
      setIsResizing(true);
      checkMobile();
      setTimeout(() => setIsResizing(false), 100);
    }, 100);

    checkMobile();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isMobile, isResizing };
}

// Shared hook for section tracking using IntersectionObserver
export function useSectionObserver(sections: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reset active section when at top of page
    if (scrollY < 100) {
      setActiveSection(null);
      setActiveSectionIndex(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleSection: IntersectionObserverEntry | null = entries[0];

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              !mostVisibleSection ||
              entry.intersectionRatio > mostVisibleSection.intersectionRatio
            ) {
              mostVisibleSection = entry;
            }
          }
        });

        if (mostVisibleSection !== null) {
          const sectionId = mostVisibleSection.target.id;
          setActiveSection(sectionId);
          setActiveSectionIndex(sections.findIndex((s) => s === sectionId));
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        root: null,
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, scrollY]);

  return {
    activeSection,
    activeSectionIndex,
    setActiveSection,
    setActiveSectionIndex,
  };
}

// Hook for handling reduced motion preference
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mql.matches);

    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
