import React from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  currentTime: string;
  duration: string;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  currentTime,
  duration,
  progress,
  onPlay,
  onPause,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Quran Audio</h2>

      <div className="mb-3 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-violet-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-5 flex justify-between text-sm text-gray-600">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onPrevious}
          className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          ⏮ Previous
        </button>

        {isPlaying ? (
          <button
            onClick={onPause}
            className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
          >
            ▶ Play
          </button>
        )}

        <button
          onClick={onNext}
          className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          ⏭ Next
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
