// src/components/quran/Loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-violet-200 dark:border-violet-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-violet-600 dark:border-violet-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
