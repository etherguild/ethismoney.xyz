"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { useResponsive, useReducedMotion } from "@/lib/gsap-utils";

const words = [
  "ICO", "DeFi", "NFT", "L2", "Programmable", "Internet",
  "AI", "Ultra Sound", "Creator"
];

export const ETHisMoneyTitle = ({ children }: { children?: React.ReactNode }) => {
  const [isStartTitleAnimation, setIsStartTitleAnimation] = useState<boolean>(false);
  const { isMobile, isResizing } = useResponsive(1117);
  const prefersReducedMotion = useReducedMotion();

  // Start title animation after delay
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      setIsStartTitleAnimation(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useGSAP(() => {
    if (!isStartTitleAnimation || prefersReducedMotion) return;

    const typeBracketsTimeline = gsap.timeline({ paused: true });

    typeBracketsTimeline
      .to("#left-bracket", {
        text: {
          value: " [  ",
          preserveSpaces: true,
        },
      })
      .to("#right-bracket", {
        text: {
          value: "  ] ",
          preserveSpaces: true,
        },
      });

    const typeWriterTimeline = gsap.timeline({
      paused: true,
      repeat: -1,
      defaults: {
        ease: "sine.in",
      }
    });

    words.forEach((word) => {
      typeWriterTimeline
        .to(".typewriter-letters", {
          duration: 1,
          text: { value: word },
        })
        .to(".typewriter-letters", {
          duration: 0.5,
          text: { value: word },
        })
        .to(".typewriter-letters", {
          scale: 1.0,
          duration: 0.5,
        })
        .to({}, { duration: 1.5 }) // Pause before deleting
        .to(".typewriter-letters", {
          duration: 0.5,
          text: {
            value: "",
            rtl: true,
          },
        })
        .to({}, { duration: 1 }); // Pause before next word
    });

    typeBracketsTimeline.play().then(() => {
      typeWriterTimeline.play();
    });

    return () => {
      typeWriterTimeline.kill();
      typeBracketsTimeline.kill();
    };
  }, [isStartTitleAnimation, prefersReducedMotion]);

  if (isMobile) {
    return (
      <div className="flex items-center gap-x-[23px] h-[91px] relative fill-inherit scale-[35%] -mr-[20px]">
        <MobileTitle isStartTitleAnimation={isStartTitleAnimation} />
      </div>
    );
  }

  return (
    <div className="w-fit h-[91px] relative fill-inherit">
      <DesktopTitle isStartTitleAnimation={isStartTitleAnimation} />
    </div>
  );
};

const MobileTitle = ({ isStartTitleAnimation }: { isStartTitleAnimation: boolean }) => (
  <>
    <ETHLogo />
    <TitleContent isStartTitleAnimation={isStartTitleAnimation} />
    <MoneyLogo />
  </>
);

const DesktopTitle = ({ isStartTitleAnimation }: { isStartTitleAnimation: boolean }) => (
  <>
    <ETHLogo />
    <div className="absolute left-[168.43px] flex items-center">
      <TitleContent isStartTitleAnimation={isStartTitleAnimation} />
      <MoneyLogo />
    </div>
  </>
);

const ETHLogo = () => (
  <div className="w-[140.43px] h-[58.98px] left-[5px] top-[11.83px] absolute">
    <svg width="141" height="60" viewBox="0 0 141 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M91.7664 59.8128V0.830383H102.907V25.0787H129.286V0.830383H140.427V59.8128H129.286V35.4825H102.907V59.8128H91.7664Z" fill="currentColor" />
      <path d="M58.7239 59.8128V11.2342H40.1281V0.830383H88.4609V11.2342H69.865V59.8128H58.7239Z" fill="currentColor" />
      <path d="M0 59.8128V0.830383H38.5024V11.2342H11.1411V23.8499H33.5872V34.2537H11.1411V49.4089H38.5024V59.8128H0Z" fill="currentColor" />
    </svg>
  </div>
);

const TitleContent = ({ isStartTitleAnimation }: { isStartTitleAnimation: boolean }) => (
  <>
    <div className="w-[34.37px] h-[39.16px] relative">
      <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.0013 39.9006C19.451 39.9006 16.5794 39.1 14.3866 37.4989C12.2111 35.8804 10.8885 33.6005 10.4186 30.6593L17.6758 29.5629C17.9717 30.8856 18.6243 31.9211 19.6337 32.6694C20.6605 33.4178 21.9571 33.7919 23.5234 33.7919C24.8113 33.7919 25.8033 33.5483 26.4994 33.061C27.1956 32.5563 27.5436 31.8601 27.5436 30.9726C27.5436 30.4157 27.4044 29.9719 27.126 29.6412C26.8475 29.2931 26.221 28.9538 25.2464 28.6231C24.2892 28.2924 22.7925 27.8573 20.7563 27.3178C18.459 26.7261 16.6229 26.0648 15.2481 25.3338C13.8732 24.6029 12.8812 23.7327 12.2721 22.7233C11.6629 21.6965 11.3584 20.4608 11.3584 19.0164C11.3584 17.2064 11.8196 15.6401 12.7419 14.3174C13.6643 12.9773 14.9609 11.9505 16.6316 11.237C18.3198 10.506 20.3038 10.1406 22.5836 10.1406C24.7939 10.1406 26.7518 10.4799 28.4573 11.1587C30.1629 11.8374 31.5377 12.8033 32.582 14.0564C33.6436 15.3094 34.2962 16.7887 34.5399 18.4943L27.2826 19.7995C27.1608 18.7553 26.7083 17.9286 25.9251 17.3195C25.142 16.7104 24.0803 16.3536 22.7403 16.2492C21.435 16.1622 20.3821 16.3362 19.5815 16.7713C18.7984 17.2064 18.4068 17.8329 18.4068 18.6509C18.4068 19.1382 18.5721 19.5472 18.9028 19.8778C19.2509 20.2085 19.9557 20.5479 21.0173 20.8959C22.0963 21.244 23.7323 21.6965 25.9251 22.2534C28.0657 22.8103 29.78 23.463 31.0678 24.2113C32.3731 24.9423 33.3216 25.8298 33.9133 26.874C34.505 27.9008 34.8009 29.1452 34.8009 30.6071C34.8009 33.4961 33.7567 35.7672 31.6683 37.4206C29.5799 39.0739 26.6909 39.9006 23.0013 39.9006Z" fill="currentColor" />
        <path d="M0.42688 7.00794V0.742676H7.52751V7.00794H0.42688ZM0.42688 39.1174V10.9237H7.52751V39.1174H0.42688Z" fill="currentColor" />
      </svg>
    </div>
    {!isStartTitleAnimation ? (
      <div className="w-[20px]" />
    ) : (
      <div className="pl-[10px] pr-[10px] whitespace-nowrap font-black text-[54px] font-manrope flex items-center">
        <div id="left-bracket" className="" />
        <div className="typewriter-letters text-center" />
        <div id="right-bracket" className="" />
      </div>
    )}
  </>
);

const MoneyLogo = () => (
  <div className="w-[250.01px] h-[78.64px] top-[12px] relative transition-all">
    <svg width="251" height="79" viewBox="0 0 251 79" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M215.042 78.6432L223.562 55.2141L223.726 62.0954L204.475 14.7456H216.025L228.969 48.2509H226.347L239.209 14.7456H250.35L225.364 78.6432H215.042Z" fill="currentColor" />
      <path d="M184.188 60.2112C179.656 60.2112 175.655 59.2418 172.187 57.303C168.747 55.3369 166.043 52.6472 164.077 49.2339C162.138 45.7933 161.169 41.8611 161.169 37.4374C161.169 32.6041 162.125 28.3989 164.036 24.8217C165.948 21.2446 168.583 18.4729 171.941 16.5069C175.3 14.5135 179.164 13.5168 183.533 13.5168C188.175 13.5168 192.121 14.609 195.371 16.7936C198.62 18.9781 201.023 22.0501 202.58 26.0096C204.136 29.969 204.682 34.6248 204.218 39.9769H193.2V35.8809C193.2 31.3753 192.476 28.1395 191.029 26.1734C189.609 24.18 187.274 23.1833 184.025 23.1833C180.229 23.1833 177.43 24.3439 175.628 26.6649C173.853 28.9587 172.965 32.3584 172.965 36.864C172.965 40.9873 173.853 44.1822 175.628 46.4486C177.43 48.6878 180.065 49.8073 183.533 49.8073C185.718 49.8073 187.588 49.3295 189.145 48.3737C190.701 47.418 191.889 46.039 192.708 44.2368L203.849 47.4317C202.184 51.473 199.548 54.6133 195.944 56.8525C192.367 59.0916 188.448 60.2112 184.188 60.2112ZM169.525 39.9769V31.703H198.852V39.9769H169.525Z" fill="currentColor" />
      <path d="M145.77 58.9824V38.0928C145.77 37.0824 145.715 35.799 145.606 34.2426C145.497 32.6588 145.156 31.075 144.582 29.4912C144.009 27.9074 143.067 26.583 141.756 25.5181C140.472 24.4531 138.643 23.9206 136.267 23.9206C135.312 23.9206 134.288 24.0708 133.195 24.3712C132.103 24.6716 131.079 25.2587 130.123 26.1325C129.168 26.979 128.376 28.2351 127.748 29.9008C127.147 31.5665 126.846 33.7783 126.846 36.5363L120.457 33.5053C120.457 30.01 121.167 26.7332 122.587 23.6749C124.007 20.6165 126.136 18.1453 128.976 16.2611C131.844 14.377 135.448 13.4349 139.79 13.4349C143.258 13.4349 146.084 14.022 148.269 15.1962C150.453 16.3703 152.146 17.8586 153.348 19.6608C154.576 21.463 155.45 23.3472 155.969 25.3133C156.488 27.2521 156.802 29.027 156.911 30.6381C157.02 32.2492 157.075 33.4234 157.075 34.1606V58.9824H145.77ZM115.542 58.9824V14.7456H125.454V29.4093H126.846V58.9824H115.542Z" fill="currentColor" />
      <path d="M87.4467 60.2112C82.9957 60.2112 79.0908 59.2145 75.7321 57.2211C72.3734 55.2277 69.752 52.4834 67.8678 48.9881C66.0109 45.4656 65.0825 41.4242 65.0825 36.864C65.0825 32.2492 66.0382 28.1941 67.9497 24.6989C69.8612 21.1763 72.4963 18.432 75.855 16.4659C79.2137 14.4998 83.0776 13.5168 87.4467 13.5168C91.8977 13.5168 95.8025 14.5135 99.1612 16.5069C102.547 18.5002 105.182 21.2582 107.067 24.7808C108.951 28.276 109.893 32.3038 109.893 36.864C109.893 41.4515 108.937 45.5065 107.026 49.0291C105.141 52.5244 102.506 55.2687 99.1203 57.2621C95.7616 59.2281 91.8704 60.2112 87.4467 60.2112ZM87.4467 49.8073C91.0239 49.8073 93.6862 48.6059 95.4339 46.2029C97.2088 43.7726 98.0963 40.6596 98.0963 36.864C98.0963 32.9318 97.1952 29.7916 95.3929 27.4432C93.618 25.0948 90.9692 23.9206 87.4467 23.9206C85.0164 23.9206 83.023 24.4668 81.4665 25.559C79.91 26.6513 78.7495 28.1668 77.9849 30.1056C77.2476 32.0444 76.879 34.2972 76.879 36.864C76.879 40.8235 77.7665 43.9774 79.5414 46.3257C81.3436 48.6468 83.9787 49.8073 87.4467 49.8073Z" fill="currentColor" />
      <path d="M0.336914 58.9824V0H10.3312L29.8281 39.1578L49.3251 0H59.3193V58.9824H48.9155V23.7568L31.7942 58.9824H27.862L10.7408 23.7568V58.9824H0.336914Z" fill="currentColor" />
    </svg>
  </div>
);
