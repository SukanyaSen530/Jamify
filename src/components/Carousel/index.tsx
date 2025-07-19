import React, { useState, useEffect } from "react";

import ChevronLeft from "../../assets/ChevronLeft";
import ChevronRight from "../../assets/ChevronRight";

interface CarouselProps {
  data: string[];
  onItemClick: (x: string) => void;
  activeItem?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  onItemClick,
  activeItem = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemDisplay, setItemDisplay] = useState(1);
  const itemWidth = 100 / itemDisplay;

  const getOffsetPercent = () => {
    const remToPx = 16;
    const itemMarginPx = 1 * remToPx;
    const marginPercent = (itemMarginPx / window.innerWidth) * 100;
    return itemWidth + marginPercent;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 990) {
        setItemDisplay(4);
      } else if (window.innerWidth > 700) {
        setItemDisplay(3);
      } else {
        setItemDisplay(1);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - itemDisplay) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative">
      <div className="overflow-hidden w-full py-2">
        <div
          className="flex gap-4 pl-2 pr-14 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            transform: `translateX(-${currentIndex * getOffsetPercent()}%)`,
          }}
        >
          {data?.map((item, idx) => (
            <div
              key={idx}
              className="flex-none p-3 chip"
              style={{ flexBasis: `${itemWidth}%` }}
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
        </div>
      </div>

      <div className="absolute top-1/2 left-[-3.5rem] transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="neumorphic-btn--circle disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size="18px" />
        </button>
      </div>

      <div className="absolute top-1/2 right-[-3.5rem] transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          disabled={currentIndex >= data.length - itemDisplay}
          className="neumorphic-btn--circle disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size="18px" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
