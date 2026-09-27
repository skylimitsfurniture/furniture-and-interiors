"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoBanner({ videoUrl, posterUrl }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled with muted
      });
    }
  }, [videoUrl]);

  function toggleSound(e) {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <a
      href="/products"
      className="group relative rounded-2xl overflow-hidden bg-flamedark text-paper min-h-[380px] flex flex-col justify-between p-8 md:p-10"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl || undefined}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />

      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/50 hover:bg-ink/70 text-paper text-xs flex items-center justify-center backdrop-blur-sm transition-colors"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="relative">
        <span className="inline-block bg-paper text-flamedark text-xs font-semibold px-3 py-1 rounded-full">
          Ganesh Chaturthi Edit
        </span>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mt-5">
          Welcome him home <br /> in style
        </h1>
      </div>
      <div className="relative flex items-end justify-between">
        <p className="text-paper/85 text-sm max-w-[220px]">
          Festive-ready furniture, finished by hand in Vizag — free delivery
          this week.
        </p>
        <span className="shrink-0 px-5 py-2.5 rounded-full bg-paper text-flamedark text-sm font-semibold group-hover:bg-cloud transition-colors">
          Shop the edit
        </span>
      </div>
    </a>
  );
}


