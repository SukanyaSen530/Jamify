import React from "react";
import type { Music } from "../../mock/music";

import Clock from "../../assets/Clock";
import MusicNote from "../../assets/MusicNote";

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
  return (
    <div
      className={`flex justify-between items-center rounded-lg p-4 my-0.5
        ${selectedSongId === musicData?.id ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selectedSongId === musicData?.id}
      aria-label={`Select song ${musicData?.name}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex items-center gap-x-4">
        <p className="text-xs shrink-0">#{index}</p>

        <img
          className="rounded-lg object-cover neu-shadow-subtle"
          src={musicData?.imgUrl}
          alt={`Cover for ${musicData?.name}`}
          loading="lazy"
          height="64px"
          width="64px"
        />

        <div className="flex flex-col overflow-hidden">
          <p className="text-base font-medium">{musicData?.name}</p>
          <p className="text-sm">{musicData?.singers}</p>
          <p className="text-xs">{musicData?.album}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-6">
        <div className="flex items-center gap-1 text-sm">
          <MusicNote />
          <p>{musicData?.year}</p>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Clock />
          <p>{musicData?.time}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
