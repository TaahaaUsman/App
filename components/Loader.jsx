// components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin" />

      {/* Animated Text */}
      <p className="mt-4 text-white text-lg font-semibold flex space-x-1">
        {"Loading...".split("").map((char, idx) => (
          <span
            key={idx}
            className="animate-bounce inline-block"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
