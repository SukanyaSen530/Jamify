import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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

  const itemWidth = 100 / itemDisplay;

  return (
    <div className="relative overflow-hidden w-full bg-gray p-4 rounded-neumorphic shadow-neumorphic">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.77, 0, 0.175, 1)]"
        style={{ transform: `translateX(-${currentIndex * itemWidth}%)` }}
      >
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="px-2 flex-none"
            style={{ flexBasis: `${itemWidth}%` }}
            onClick={() => onItemClick(item)}
          >
            <div
              className={`cursor-pointer bg-gray p-6 rounded-neumorphic shadow-neumorphic text-center transition duration-200 ease-in-out ${
                activeItem === item ? "shadow-neumorphic-inset-soft" : ""
              }`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-700 text-white disabled:opacity-80"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex >= data.length - itemDisplay}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-700 text-white disabled:opacity-80"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Carousel;
