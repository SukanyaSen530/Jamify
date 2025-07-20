import React, { useState, useEffect, useCallback } from "react";

import ChevronLeft from "../../assets/ChevronLeft";
import ChevronRight from "../../assets/ChevronRight";

interface CarouselProps {
  data: string[];
  onItemClick: (x: string) => void;
  activeItem?: string;
}

type Callback = (...args: any[]) => void;

export const debounce = (cb: Callback, delay = 300): Callback => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...args), delay);
  };
};

const Carousel: React.FC<CarouselProps> = ({
  data,
  onItemClick,
  activeItem = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemDisplay, setItemDisplay] = useState(1);
  const [itemWidthPercent, setItemWidthPercent] = useState(100);

  const calculateItemWidth = useCallback(() => {
    let display = 1;
    if (window.innerWidth > 1024) display = 4;
    else if (window.innerWidth > 900) display = 3;
    else if (window.innerWidth > 600) display = 2;

    const gapPx = 16;
    const totalGap = gapPx * (display - 1);
    const widthPerItem = (window.innerWidth - totalGap) / display;
    const widthPercent = (widthPerItem / window.innerWidth) * 100;

    setItemDisplay(display);
    setItemWidthPercent(widthPercent);
  }, []);

  useEffect(() => {
    const debounced = debounce(calculateItemWidth, 150);
    window.addEventListener("resize", debounced);
    calculateItemWidth();
    return () => window.removeEventListener("resize", debounced);
  }, [calculateItemWidth]);

  const maxIndex = Math.max(0, data.length - itemDisplay);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const handleNext = () => {
    if (currentIndex < data.length - itemDisplay + 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative" aria-label="Genre carousel">
      <div className="overflow-hidden w-full py-2">
        <div
          className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            transform: `translateX(-${
              clampedIndex * (itemWidthPercent + (16 / window.innerWidth) * 100)
            }%)`,
          }}
        >
          {data?.map((item, idx) => (
            <div
              key={`item-${item}-${idx}`}
              className="flex-none p-3 chip"
              style={{ flexBasis: `${itemWidthPercent}%` }}
              onClick={() => onItemClick(item)}
            >
              <div
                className={`text-center ${
                  activeItem === item ? "font-bold" : ""
                }`}
              >
                {item}
              </div>
            </div>
          ))}
          <div
            aria-hidden
            className="flex-none p-3"
            style={{ flexBasis: `${itemWidthPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-[#1f1f1f] hover:bg-[#333333] h-[45px] flex items-center absolute top-1/2 left-[-1.5] rounded-tl-sm rounded-bl-sm transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-2 text-white transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size="18px" />
        </button>
      </div>

      <div className="bg-[#1f1f1f] hover:bg-[#333333] h-[45px] flex items-center absolute top-1/2 right-1 rounded-tr-sm rounded-br-sm transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          disabled={currentIndex >= data.length - itemDisplay}
          className="p-2 text-white transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size="18px" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
