import React, { useEffect, useRef, useState } from "react";
import type { Music } from "../../mock/music";

import HighVolume from "../../assets/HighVolume";
import NoVolume from "../../assets/NoVolume";
import LowVolume from "../../assets/LowVolume";
import Play from "../../assets/Play";
import Pause from "../../assets/Pause";
import Next from "../../assets/Next";
import Previous from "../../assets/Previous";

interface AudioPlayerProps {
  musicData?: Music | null;
  handleNext: () => void;
  handlePrev: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  musicData,
  handleNext,
  handlePrev,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = (): void => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = (): void => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleToggle = (): void => {
    isPlaying ? handlePause() : handlePlay();
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume <= 0);
  };

  const handleMuteToggle = (): void => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume > 0 ? volume : 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && musicData?.file) {
      audioRef.current.src = musicData.file;
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
    setCurrentTime(0);
    setDuration(0);
  }, [musicData]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div
      className="bg-[var(--neu-light)]"
      role="region"
      aria-label="Audio player"
    >
      <audio ref={audioRef} preload="metadata" />
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => {
          const time = parseFloat(e.target.value);
          if (audioRef.current) {
            audioRef.current.currentTime = time;
          }
          setCurrentTime(time);
        }}
        aria-label="Playback progress"
        className="neumorphic-range"
        style={{ top: "-2px", position: "absolute", width: "100%" }}
      />

      <div className="flex items-center justify-between pt-6 pr-4 pb-4 pl-4">
        <div className="flex gap-4 items-center [flex:0.2]">
          {musicData?.imgUrl && (
            <img
              src={musicData.imgUrl}
              alt={`Album cover for ${musicData.name}`}
              className="object-cover rounded-lg"
              loading="lazy"
              height={"56px"}
              width={"56px"}
            />
          )}
          <div>
            <p className="text-md">{musicData?.name || "No song selected"}</p>
            <p className="text-sm">{musicData?.singers || ""}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            title="Previous"
            aria-label="Previous track"
            className="neumorphic-btn--circle "
          >
            <Previous size="18px" />
          </button>

          <button
            onClick={handleToggle}
            disabled={!musicData?.file}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause playback" : "Play playback"}
            className="neumorphic-btn--circle h-15 w-15"
          >
            {isPlaying ? <Pause size="24px" /> : <Play size="24px" />}
          </button>

          <button
            onClick={handleNext}
            title="Next"
            aria-label="Next track"
            className="neumorphic-btn--circle"
          >
            <Next size="18px" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <NoVolume size="24px" />
            ) : volume <= 0.5 ? (
              <LowVolume size="24px" />
            ) : (
              <HighVolume size="24px" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="neumorphic-range"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
