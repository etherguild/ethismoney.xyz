'use client';
import { createContext, useContext, useState, useMemo, useEffect, useLayoutEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";


export type EmbedData = {
  width: number;
  height: number;
  src: string;
  title: string;
  timeframe: "absolute" | "relative";
  zoomed?: boolean;
};

type UIContextState = {
  isMobile: boolean;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  isSafariBrowser: boolean;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  dragChartId: string;
  setDragChartId: (dragChartId: string) => void;
  scrollPosition: number;
};

const UIContext = createContext<UIContextState>({
  isMobile: false,
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () => { },
  isSafariBrowser: false,
  isDragging: false,
  setIsDragging: () => { },
  dragChartId: "",
  setDragChartId: () => { },
  scrollPosition: 0,
});

export const useUIContext = () => useContext(UIContext);

export const UIContextProvider = ({ children }) => {
  const [state, setState] = useState<UIContextState>({
    isMobile: false,
    isMobileSidebarOpen: false,
    toggleMobileSidebar: () => { },
    isSafariBrowser: false,
    isDragging: false,
    setIsDragging: () => { },
    dragChartId: "",
    setDragChartId: () => { },
    scrollPosition: 0,
  });

  const prevWindowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    // This effect will run only in the browser, where window is defined.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobileSize = window.innerWidth < 1118;



    setState(prevState => ({
      ...prevState,
      isSafariBrowser: isSafari,
      isSidebarOpen: window.innerWidth >= 1280,
      isMobile: isMobileSize,
      lastWindowWidth: window.innerWidth,
    }));

    // Handle resize events
    const updateSize = () => {
      const currentWidth = window.innerWidth;
      setState(prevState => ({
        ...prevState,
        isMobile: window.innerWidth < 1118,
      }));

      prevWindowWidthRef.current = currentWidth;
    };

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleMobileSidebar = () => setState(prevState => ({ ...prevState, isMobileSidebarOpen: !prevState.isMobileSidebarOpen }));

  const contextValue = {
    ...state,
    toggleMobileSidebar,
    scrollPosition,
  };

  useEffect(() => {
    // Checking whether we're in the browser
    const isSafari = typeof navigator !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;

    setState(prevState => ({
      ...prevState,
      isSafariBrowser: isSafari,
    }));
  }, []);

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};