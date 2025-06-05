import React, { useEffect, useRef, useState } from "react";
import type { Music } from "../../mock/music";

interface AudioPlayerProps {
  musicData?: Music | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ musicData }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = (): void => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggle = (): void => {
    if (isPlaying) handlePause();
    else handlePlay();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
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
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [musicData?.id]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [musicData?.file, volume]);

  return (
    <div className="fixed bottom-0 left-0 flex p-2 justify-between items-center w-full bg-amber-200">
      <audio ref={audioRef} src={musicData?.file ?? ""} preload="metadata" />

      <div className="flex gap-2">
        <img src={musicData?.imgUrl} className="h-12 w-12 rounded-sm" alt="" />
        <div className="">
          <p>{musicData?.name}</p>
          <p>{musicData?.singers}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1"
        />
        <div className="flex justify-between text-sm min-w-[80px]">
          <span>
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}
          </span>
          <span>/</span>
          <span>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="px-3 py-1 bg-amber-300 rounded hover:bg-amber-400"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="flex items-center gap-1">
          <span className="text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />
          <span className="text-sm min-w-[30px]">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
