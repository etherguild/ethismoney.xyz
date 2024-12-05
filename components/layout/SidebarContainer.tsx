"use client";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { Icon } from "@iconify/react";
import { useUIContext } from "@/contexts/UIContext";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import ContainerSidebar from "../ContainerSidebar";
import SidebarHead from "../SidebarHead";
import SidebarGroup from "../SidebarGroup";
import SidebarGroupItem from "../SidebarGroupItem";
import { GTPIcon } from "./GTPIcon";
import { GTPIconName } from "@/icons/gtp-icon-names";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from "@gsap/react";
import { time } from "console";
import { Sections } from "@/lib/sections";
import { ETHisMoneyTitle } from "../EthIsMoney/EthIsMoney";



export default function SidebarContainer() {

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  const [scrollY, setScrollY] = useState(0);
  const [isResizing, setIsResizing] = useState(false);

  // const [sectionOffsets, setSectionOffsets] = useState<{ [key: string]: number } | null>(null);

  // const applySectionOffsets = () => {
  //   const newSectionOffsets: { [key: string]: number } = {};
  //   Sections.forEach((section) => {
  //     const element = document.getElementById(section.sectionId);
  //     if (element) {
  //       newSectionOffsets[section.sectionId] = element.offsetTop;
  //     }
  //   });
  //   setSectionOffsets(newSectionOffsets);
  // }

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);

      setTimeout(() => {
        setIsResizing(false);
        // applySectionOffsets();
      }, 100);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Apply section offsets
    // applySectionOffsets();
    // Call the event handler once to apply the initial section offsets
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   // reset the active section when the scroll position is at the top
  //   setActiveSection(null);
  //   setActiveSectionIndex(null);
  // }, []);

  useEffect(() => {
    // reset the active section when the scroll position is at the top
    if (scrollY < 100) {
      setActiveSection(null);
      setActiveSectionIndex(null);
    }
    //  else {
    //   if (sectionOffsets) {
    //     const sectionKeys = Object.keys(sectionOffsets);
    //     for (let i = 0; i < sectionKeys.length; i++) {
    //       const section = sectionKeys[i];
    //       if (window.scrollY > sectionOffsets[section]) {
    //         setActiveSection(section);
    //         setActiveSectionIndex(i);
    //       }
    //     }
    //   }
    // }
  }, [scrollY]);

  useGSAP(() => {
    // increase the size of the section link when it is in view
    gsap.registerPlugin(ScrollTrigger);

    // Section animations
    Sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSection(section.sectionId);
          setActiveSectionIndex(Sections.findIndex(s => s.sectionId === section.sectionId));

        },
        onEnterBack: () => {
          setActiveSection(section.sectionId);
          setActiveSectionIndex(Sections.findIndex(s => s.sectionId === section.sectionId));
        }
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  // the active section's nav link should move with the section's topoffset
  useGSAP(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // find the section's header title .headline-xl
    const activeSection = Sections[activeSectionIndex || 0].sectionId;
    const activeSectionElement = document.getElementById(`${activeSection}-content`);
    const activeSectionHeader = activeSectionElement?.querySelector("h2.headline-xl");

    if (!activeSectionHeader) {
      return;
    }

    const activeSectionHeaderH2 = activeSectionHeader as HTMLHeadingElement;

    const activeSectionHeaderTop = activeSectionHeaderH2.offsetTop;

    // move the active section's nav link to the top of the sidebar
    gsap.to(`#${activeSection}-link`, {
      y: -activeSectionHeaderTop,
      ease: "power2.out",
      duration: 0.3,
      scrollTrigger: {
        trigger: `#${activeSection}-section`,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [activeSection]);


  const [activeNavAnimationIndex, setActiveNavAnimationIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const NavItems = Sections.slice(0, 3);

    timeoutRef.current = setInterval(() => {
      setActiveNavAnimationIndex((prev) => {
        if (prev === NavItems.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };

  }, []);

  const handleNavItemHover = (index: number) => {
    // pause the animation and set the active nav item
    if (timeoutRef.current) {
      // pause timer so we can start it again after the hover
      clearInterval(timeoutRef.current);
    }
    setActiveNavAnimationIndex(index);
  }

  const handleNavItemLeave = () => {
    // resume the animation
    timeoutRef.current = setInterval(() => {
      setActiveNavAnimationIndex((prev) => {
        if (prev === Sections.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  }

  const mobileNavRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (mobileNavRef.current) {
  //     if (activeSection === null) {
  //       const firstMobileNavElement = document.getElementById("first-mobile-nav");
  //       if (!firstMobileNavElement)
  //         return;
  //       mobileNavRef.current.scrollTo({
  //         left: firstMobileNavElement.offsetLeft - (mobileNavRef.current.clientWidth / 2) + (firstMobileNavElement.clientWidth / 2),
  //         behavior: "smooth",
  //       });
  //     } else {
  //       const mobildNavId = Sections[activeSectionIndex || 0].mobileNavId;
  //       const mobileNavElement = document.getElementById(mobildNavId);
  //       if (mobileNavElement) {
  //         // scroll so it is centered
  //         mobileNavRef.current.scrollTo({
  //           left: mobileNavElement.offsetLeft - (mobileNavRef.current.clientWidth / 2) + (mobileNavElement.clientWidth / 2),
  //           behavior: "smooth",
  //         });
  //       } else {
  //         const firstMobileNavElement = document.getElementById("first-mobile-nav");
  //         if (!firstMobileNavElement)
  //           return;
  //         mobileNavRef.current.scrollTo({
  //           left: firstMobileNavElement.offsetLeft - (mobileNavRef.current.clientWidth / 2) + (firstMobileNavElement.clientWidth / 2),
  //           behavior: "smooth",
  //         });
  //       }

  //     }
  //   }
  // }, [activeSection]);

  return (
    <>
      <div className="hidden desktop:block w-[150px] pr-[3px] z-[100] overflow-visible bg-white/0 text-black">
        <div className=" sticky top-0 left-0 pt-[50px] pl-[80px] min-h-screen max-h-screen hidden md:flex flex-col overflow-visible gap-y-[36px]">
          <div className="select-none flex flex-col gap-y-[30px] w-full items-center">
            {/* spacer for header row */}
            <div className="h-[44px]"></div>
            <div className="flex items-center justify-start gap-x-[30px]">
              <div className={`group logo-container flex items-center relative ${scrollY > 100 && "-translate-y-[74px]"} transition-all duration-300 z-[1000]`}>
                <div
                  // href="#first-section"
                  id="first-section-link"
                  className={`relative flex logo ${scrollY > 100 && "scales-[25%]"} transition-all duration-300 cursor-default`}

                >
                  <div className={`overflow-visible flex items-center justify-center ${scrollY > 100 ? "size-[32px]" : "size-[128px]"} relative cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      // scroll into view top of page, smooth
                      window.scrollTo({ top: 0, behavior: "smooth" });

                    }}
                  >
                    <Image src="/eth-is-money-logo.svg"
                      alt="ETH is Money logo"
                      width={128}
                      height={128}
                      priority
                      className={`object-contain block ${scrollY > 100 && "group-hover:hidden"}`}
                    />
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`hidden ${scrollY > 100 && "group-hover:block"}`}>
                      <path d="M10.2281 11.6552H13.5485C14.8945 11.6552 15.6298 10.1722 14.7681 9.19546L10.2198 4.03961C9.58512 3.32013 8.41532 3.32013 7.78062 4.03961L3.23232 9.19546C2.37064 10.1722 3.10593 11.6552 4.45192 11.6552H7.77249L7.77249 18H10.2198L10.2281 11.6552Z" fill="#F1F9FC" />
                      <path d="M0 0.5C0 0.223858 0.223858 0 0.5 0H17.5C17.7761 0 18 0.223858 18 0.5V1.5C18 1.77614 17.7761 2 17.5 2H0.5C0.223858 2 0 1.77614 0 1.5V0.5Z" fill="#F1F9FC" />
                    </svg>
                  </div>
                  {/* on group hover, show the label when the section is not active and our scrollY is > 300 */}
                  <div className={`absolute z-[-1] -left-[5px] -top-[5px] -bottom-[5px] opacity-0 pointer-events-none group-hover:pointer-events-auto ${scrollY > 100 && "group-hover:opacity-100"}`}>
                    <div className="flex gap-x-[10px] items-center pl-[5px] pr-[5px] rounded-full w-full h-full bg-[#B7DDE8] whitespace-nowrap">
                      <div
                        className="bg-eth-logo flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: `32px`,
                          height: `32px`,
                        }} >
                        <div className={`overflow-visible w-[32px] h-[32px] relative`}>
                        </div>
                      </div>
                      <div className="headline-md" style={{ paddingRight: activeSectionIndex === 0 ? 10 : 0 }}>
                        Back to top
                      </div>
                      {Sections.slice(0, activeSectionIndex || 0).map((section, index) => (
                        <div
                          key={section.sectionId}
                          className="rounded-full bg-eth-logo flex items-center justify-center w-[32px] h-[32px] group-hover:pointer-events-auto cursor-pointer"
                          onClick={() => {
                            const element = document.getElementById(section.sectionId);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          <Icon icon={`${section.icon}-monochrome`} className="text-ice" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`absolute -right-[30px] ${scrollY > 100 && "group-hover:opacity-0"} transition-opacity duration-100`}>
                  <div className={`logo-title flex gap-x-[30px] items-center group-hover:pointer-events-none ${scrollY > 100 ? "translate-x-[20px] scale-[23.07%] text-[#B0B7C3]" : "scale-100 text-blue1"} transition-all duration-300`}>
                    <ETHisMoneyTitle />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[106px]" />
            {/* Navigation Items */}
            <div id="cycle-animated-nav-items" className={`relative flex flex-col transition-all duration-300`}>
              {!isResizing && Sections.slice(activeSectionIndex || 0).filter((section, index) => scrollY < 300 && index > 2 ? false : true).map((section, index) => {
                // if (scrollY < 300 && index > 2) {
                //   return null;
                // }

                const buttonSize = activeSection === section.sectionId || (activeNavAnimationIndex == index && scrollY < 300) ? 64 : 32;
                const iconSize = activeSection === section.sectionId || (activeNavAnimationIndex == index && scrollY < 300) ? 36 : 18;

                const wasActiveNavItem = (activeNavAnimationIndex < index && scrollY < 300) || scrollY > 300 && index > 0;
                const butonTop = wasActiveNavItem ? index * 64 + 30 : index * 64;
                const left = -buttonSize / 2;

                let translateY = 0;

                if (scrollY > 100) {
                  translateY -= 96;
                  if (index == 0) {
                    translateY -= 96;
                  }
                }

                return (
                  <div key={section.sectionId}>
                    <div
                      className={`z-[2] group absolute bg-eth-logo flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer`}
                      style={{
                        transform: `translateY(${translateY}px)`,
                        top: `${butonTop}px`,
                        left: `${left}px`,
                        width: `${buttonSize}px`,
                        height: `${buttonSize}px`,
                      }}
                      onMouseEnter={() => handleNavItemHover(index)}
                      onMouseLeave={handleNavItemLeave}
                      onClick={() => {
                        const element = document.getElementById(section.sectionId);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      <Icon
                        icon={`${section.icon}-monochrome`}
                        className="text-ice transition-all duration-300"
                        style={{
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                        }}
                      />
                      {/* on group hover, show the label when the section is not active and our scrollY is > 300 */}
                      <div className={`absolute z-[-1] -left-[5px] -top-[5px] -bottom-[5px] opacity-0 pointer-events-none ${scrollY > 300 && index !== 0 && "group-hover:opacity-100"}`}>
                        <div className="flex gap-x-[10px] items-center pl-[5px] pr-[15px] rounded-full w-full h-full bg-[#B7DDE8] whitespace-nowrap">
                          <div
                            className="bg-eth-logo flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                              width: `${buttonSize}px`,
                              height: `${buttonSize}px`,
                            }} >
                            <Icon
                              icon={`${section.icon}-monochrome`}
                              className="text-ice transition-all duration-300"
                              style={{
                                width: `${iconSize}px`,
                                height: `${iconSize}px`,
                              }}
                            />
                          </div>
                          <div className="headline-md">
                            {section.label}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      key={section.sectionId}
                      className={`absolute flex items-center justify-start transition-all duration-300 ${scrollY < 300 ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"} `}
                      style={{
                        top: `${butonTop}px`,
                        left: `67px`,
                        // width: `${buttonSize}px`,
                        height: `${buttonSize}px`,
                      }}
                      onMouseEnter={() => handleNavItemHover(index)}
                      onMouseLeave={handleNavItemLeave}
                      onClick={() => {
                        const element = document.getElementById(section.sectionId);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      <div className={`relative left-0 whitespace-nowrap flex gap-x-[30px] items-center text-blue1 ${(activeNavAnimationIndex == index && scrollY < 300) ? "highlight-text-xl" : "text-xl"} transition-all duration-300`}>
                        {section.label}
                      </div>
                    </div >
                  </div>
                )
              })}
            </div>
          </div >
        </div >
      </div>
    </>
  );
}



type SidebarButtonProps = {
  // should be one of the strings in GTPIconNames
  icon: GTPIconName;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
} & React.ComponentProps<typeof Icon>;
type sizes = "sm" | "md" | "lg" | "xl";

export const SidebarButtonSize: { [key in sizes]: string } = {
  sm: "32px",
  md: "36px",
  lg: "64px",
  xl: "128px",
};

const sizeClassMap = {
  sm: "w-[15px] h-[15px]",
  md: "w-[24px] h-[24px]",
  lg: "w-[36px] h-[36px]",
};

/**
  * SidebarButton
  * @param icon - the name of the icon
  * @param size - the size of the icon (sm, md, lg)
  * @returns the icon with the specified size (with a container div that has the same size)
  * @example
  * <SidebarButton icon="gtp:donate" size="lg" />
        */
export const SidebarButton = ({ icon, className, ...props }: SidebarButtonProps) => {
  return (
    <div className={sizeClassMap[props.size || "md"]}>
      <Icon
        icon={`gtp:${icon}`}
        className={`${sizeClassMap[props.size || "md"] || "w-[24px] h-[24px]"} ${className}`}
        {...props}
      />
    </div>
  );
};