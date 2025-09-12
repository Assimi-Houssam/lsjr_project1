import Navbar from "../layout/navbar";
import Quiz from "./quiz";
import { useState } from "react";

export default function Thequiz() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-white"
          : "bg-white rounded-xl shadow-lg border border-gray-200 m-4 overflow-hidden"
      }`}
    >
      {/* Card Header with Fullscreen Toggle */}
      {!isFullscreen && (
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Quiz Section</h2>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            title="Enter Fullscreen"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 z-10 ">
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-black/20 hover:bg-black/30 rounded-lg transition-colors duration-200 backdrop-blur-sm"
            title="Exit Fullscreen"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Content */}
      <div className={isFullscreen ? "h-full pt-14" : ""}>
        <Navbar />
        <Quiz />
      </div>
    </div>
  );
}
