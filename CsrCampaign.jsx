import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  {
    step: "Step 01. 프롤로그",
    desc: "물 부족으로 마른 갈증을 겪는 소외 지역의 안타까운 풍경.",
    image: "./images/comic1.png"
  },
  {
    step: "Step 02. 문제제기",
    desc: "누구보다 깨끗한 물을 마음껏 마셔야 할 아이들이 식수난으로 고통받는 모습.",
    image: "./images/comic2.png"
  },
  {
    step: "Step 03. 행동실천",
    desc: "아이들에게 웃음을 찾아주기 위해 비에이텍 봉사단이 나섭니다.",
    image: "./images/comic3.png"
  },
  {
    step: "Step 04. 데이터화",
    desc: "비에이텍의 특허받은 고정밀 정량펌프 기술로 마르지 않는 배관을 설계하고 모니터링합니다.",
    image: "./images/comic4.png"
  },
  {
    step: "Step 05. 피날레",
    desc: "맑은 물이 콸콸 쏟아져 나와 신나게 뛰어노는 아이들의 환한 미소.",
    image: "./images/comic5.png"
  },
  {
    step: "Step 06. 엔딩",
    desc: "",
    image: "./images/comic6.png",
    isEnding: true
  }
];

export default function CsrCampaign() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);

  const totalSlides = CARDS.length;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      // 마지막 장에서 다음 클릭 시 다음 도면 아카이브 섹션으로 부드러운 스냅 이동
      const nextSection = document.querySelector("#blueprint-archive-section");
      if (nextSection) {
        const nextTop = nextSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: nextTop,
          behavior: "smooth"
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        // Wheel Down
        if (currentSlide < totalSlides - 1) {
          e.preventDefault(); // 스크롤 차단하여 카드 완성 유도
        } else {
          // 마지막 장: 다음 도면 아카이브 섹션으로 스냅 스크롤링
          e.preventDefault();
          if (!isTransitioning.current) {
            isTransitioning.current = true;
            const nextSection = document.querySelector("#blueprint-archive-section");
            if (nextSection) {
              const nextTop = nextSection.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: nextTop,
                behavior: "smooth"
              });
            }
            setTimeout(() => {
              isTransitioning.current = false;
            }, 1000);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSlide, totalSlides]);

  // Framer motion variants for the sliding transition
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        rotateY: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotateY: dir > 0 ? -45 : 45,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        rotateY: { duration: 0.4 }
      }
    })
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center items-center overflow-hidden select-none"
      id="csr-pipeline-section"
    >
      {/* Title Header */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 z-10 text-left">
        <div className="font-sans text-[0.9rem] font-bold text-[#00a3e0] tracking-[0.2em] mb-2 uppercase">
          CSR Campaign
        </div>
        <h2 className="text-[2.2rem] text-[#0b1c30] font-extrabold tracking-tight leading-snug m-0">
          물이 채우는 온기, <span className="bg-gradient-to-r from-[#00a3e0] to-[#00e5ff] bg-clip-text text-transparent">비에이텍이 그리는 깨끗한 미래</span>
        </h2>
      </div>

      {/* Card Carousel Viewport */}
      <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center px-6" style={{ perspective: "1000px" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full max-w-[420px] aspect-square rounded-[24px] border border-black/5 shadow-lg overflow-hidden flex flex-col justify-between bg-cover bg-center bg-no-repeat bg-[#f8fafc]"
            style={{ 
              backgroundImage: `url('${CARDS[currentSlide].image}')`,
            }}
          >
            {CARDS[currentSlide].isEnding ? (
              <div className="flex flex-col justify-between h-full p-12 bg-gradient-to-br from-[#0a192c] to-[#0b2850] text-white">
                <div className="space-y-4">
                  <h4 className="text-[1.6rem] font-extrabold text-[#00e5ff] tracking-tight">Water is Life</h4>
                  <p className="text-[0.98rem] leading-[1.65] text-white/80 font-light">
                    비에이텍은 정밀한 물 공학 기술력을 환원하여, 세상 모든 곳에 안전하고 맑은 물줄기가 닿는 그날까지 멈추지 않고 실천해 가겠습니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="text-[0.9rem] text-white/60 leading-normal font-medium">
                    (주)비에이텍 BAETECK | 문의: 033-264-9243
                    <strong className="block text-white text-[1rem] mt-1 tracking-wider font-semibold">CSR 사회공헌 문의 센터</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 w-full bg-white/95 border-t border-black/5 p-5 shadow-inner z-[2]">
                <span className="font-sans text-[0.8rem] font-bold text-[#00a3e0] uppercase block mb-1">
                  {CARDS[currentSlide].step}
                </span>
                <p className="text-[0.92rem] text-[#334155] font-medium leading-normal m-0">
                  {CARDS[currentSlide].desc}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Buttons */}
      <button 
        onClick={handlePrev}
        className={`absolute left-[4%] top-[55%] -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-white/90 border border-[#0b1c30]/15 text-[#0b1c30] flex items-center justify-center cursor-pointer z-50 shadow-md hover:bg-white hover:border-[#00a3e0] hover:scale-[1.08] transition-all duration-300 ${currentSlide === 0 ? "opacity-0 pointer-events-none invisible" : ""}`}
        aria-label="이전 카드"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <button 
        onClick={handleNext}
        className={`absolute right-[4%] top-[55%] -translate-y-1/2 z-50 flex items-center justify-center cursor-pointer transition-all duration-300 ${
          currentSlide === totalSlides - 1 
            ? "h-[54px] rounded-[27px] px-7 bg-gradient-to-r from-[#00a3e0] to-[#00e5ff] text-white border-none shadow-[0_8px_25px_rgba(0,229,255,0.4)] hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(0,229,255,0.6)]" 
            : "w-[60px] h-[60px] rounded-full bg-white/90 border border-[#0b1c30]/15 text-[#0b1c30] shadow-md hover:bg-white hover:border-[#00a3e0] hover:scale-[1.08]"
        }`}
        aria-label={currentSlide === totalSlides - 1 ? "캠페인 완료 및 다음 페이지로 이동" : "다음 카드"}
      >
        {currentSlide === totalSlides - 1 && (
          <span className="whitespace-nowrap text-[0.95rem] font-bold mr-2 font-sans">
            캠페인 완료 및 다음 페이지로 이동
          </span>
        )}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${currentSlide === totalSlides - 1 ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Right side water pipeline guide progress indicator */}
      <div className="absolute right-[5%] top-[25%] h-[50vh] w-3 bg-[#E0E0E0] rounded-[6px] z-10 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08)] flex flex-col justify-start items-center max-md:hidden">
        <div 
          className="w-full bg-gradient-to-b from-[#00e5ff] to-[#00a3e0] rounded-[6px] shadow-[0_0_15px_rgba(0,229,255,0.6)] transition-all duration-300 relative"
          style={{ height: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
        />
        <span className="absolute -bottom-[25px] text-[1.1rem] text-[#00a3e0] animate-bounce select-none">▼</span>
      </div>
    </div>
  );
}
