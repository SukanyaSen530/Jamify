import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeMute,
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import type { Music } from "../../mock/music";

interface AudioPlayerProps {
  musicData?: Music | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ musicData }) => {
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
      className="fixed bottom-0 left-0 w-full bg-gray text-gray-800 z-50 shadow-neumorphic pt-2"
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
        className="w-full appearance-none h-1 bg-slate-300 rounded-full 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:bg-accent 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:h-3 
          [&::-webkit-slider-thumb]:w-3 
          [&::-webkit-slider-thumb]:cursor-pointer 
          transition-all hover:bg-slate-400 mb-2"
        style={{ top: "-2px", position: "absolute", width: "100%" }}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {musicData?.imgUrl && (
            <img
              src={musicData.imgUrl}
              alt={`Album cover for ${musicData.name}`}
              className="h-12 w-12 rounded-neumorphic shadow-neumorphic object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-sm sm:text-base">
              {musicData?.name || "No song selected"}
            </p>
            <p className="text-gray-500 text-xs">{musicData?.singers || ""}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            title="Previous"
            aria-label="Previous track"
            className="bg-gray rounded-full shadow-neumorphic-deep flex items-center justify-center h-[40px] w-[40px] transition-all active:shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>

          <button
            onClick={handleToggle}
            disabled={!musicData?.file}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause playback" : "Play playback"}
            className="bg-gray text-accent rounded-full shadow-neumorphic-deep flex items-center justify-center h-[50px] w-[50px] transition-all active:shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          <button
            title="Next"
            aria-label="Next track"
            className="bg-gray rounded-full shadow-neumorphic-deep flex items-center justify-center h-[40px] w-[40px] transition-all active:shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="w-24 appearance-none h-1 bg-slate-300 rounded-full 
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:bg-accent 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:cursor-pointer 
              transition-all hover:bg-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
