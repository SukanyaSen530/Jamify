import React, { useState } from "react";
import type { Music } from "../../mock/music";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

interface CardProps {
  musicData?: Music | null;
  index: number;
  onClick: () => void;
  selectedSongId?: string;
}

const Card: React.FC<CardProps> = ({
  musicData,
  index = 0,
  onClick,
  selectedSongId = "",
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleClickLike = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIsLiked((prevVal) => !prevVal);
  };

  return (
    <div
      className={`rounded-lg grid grid-cols-1 md:grid-cols-2 items-center w-full p-4 relative cursor-pointer duration-200 ease-in gap-y-2
        ${
          selectedSongId === musicData?.id
            ? "bg-gray shadow-neumorphic-inset-soft"
            : "hover:bg-accent-200"
        }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selectedSongId === musicData?.id}
      aria-label={`Select song ${musicData?.name}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex items-center gap-x-4 col-span-1">
        <p className="text-xs text-primary shrink-0">#{index}</p>

        <img
          className="h-16 w-16 rounded-lg object-cover"
          src={musicData?.imgUrl}
          alt={`Cover for ${musicData?.name}`}
        />

        <div className="flex flex-col overflow-hidden">
          <p className="text-base font-medium text-primary truncate max-w-[200px]">
            {musicData?.name}
          </p>
          <p className="text-sm text-gray-700 truncate max-w-[150px]">
            {musicData?.singers}
          </p>
          <p className="text-xs text-gray-700 truncate max-w-[150px]">
            {musicData?.album}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly md:justify-end gap-6">
        <div className="flex items-center gap-1 text-sm text-gray-800">
          <FontAwesomeIcon icon={faMusic} aria-hidden="true" />
          <p>{musicData?.year}</p>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-800">
          <FontAwesomeIcon icon={faClock} aria-hidden="true" />
          <p>{musicData?.time}</p>
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full shadow-inner bg-bg border border-gray-300 
          transition-all duration-150 hover:shadow-neumorphic-inset active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          onClick={handleClickLike}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeartRegular}
            color={isLiked ? "red" : "black"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="absolute inset-x-1/6 bottom-0 h-0.5 bg-gray-300" />
    </div>
  );
};

export default Card;
