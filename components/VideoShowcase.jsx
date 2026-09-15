"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function VideoShowcase({
  videoUrl = process.env.NEXT_PUBLIC_GANESH_VIDEO_URL || "/videos/ganesh-chaturthi.mp4",
  posterUrl = process.env.NEXT_PUBLIC_GANESH_VIDEO_POSTER || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#1E2A32] text-[#FBFAF7] overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8B5E3C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#E8583A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md">
              <span className="text-amber-400">●</span> Live Cinema & Event Showcase
            </div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-[#FBFAF7]">
              Craft In Motion
            </h2>
            <p className="text-sm md:text-base text-[#FBFAF7]/70 mt-2 max-w-lg">
              Step inside our Visakhapatnam timber studio and celebrate hand-joined excellence with sound & high-definition visuals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#FBFAF7]/60">
              {isMuted ? "Sound is Muted (Click to Unmute)" : "Audio Enabled"}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isMuted
                  ? "bg-[#E8583A] text-white hover:bg-[#C43F24]"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
            >
              <span>{isMuted ? "🔇 Unmute Video Sound" : "🔊 Sound Playing"}</span>
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video max-h-[640px] w-full group">
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Cinematic subtle dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none transition-opacity duration-300" />

          {/* Top Bar Branding */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 z-20">
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-wider border border-white/15">
              Skylimits Studio Edit • 4K
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#E8583A]/90 text-white text-xs font-bold shadow-xs">
              Seasonal Event
            </span>
          </div>

          {/* Center Play/Pause Large Action Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <button
              type="button"
              onClick={togglePlay}
              className="pointer-events-auto p-5 md:p-6 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/30 shadow-2xl"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg className="w-8 h-8 md:w-10 md:h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Information & Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
            {/* Story Highlight info */}
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                Authentic Craftsmanship • Visakhapatnam
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-white font-semibold mt-1 leading-snug">
                Built to Outlast the Lease
              </h3>
              <p className="text-xs md:text-sm text-white/80 mt-1 line-clamp-2">
                Watch how natural timber logs are cut, sanded, hand-finished with organic oils, and turned into architectural home sanctuaries.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="px-5 py-2.5 rounded-full bg-[#8B5E3C] hover:bg-[#5E3E27] text-white text-xs md:text-sm font-semibold transition-all shadow-md"
                >
                  Shop Featured Products
                </Link>
                <Link
                  href="/#story"
                  className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs md:text-sm font-semibold backdrop-blur-md transition-all border border-white/20"
                >
                  Read Studio Story
                </Link>
              </div>
            </div>

            {/* Bottom Right Interactive Controls */}
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 self-start md:self-end">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="text-white hover:text-amber-300 transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="h-4 w-[1px] bg-white/20" />

              {/* Mute/Unmute */}
              <button
                type="button"
                onClick={toggleMute}
                className="text-white hover:text-amber-300 transition-colors text-sm"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-20 accent-[#8B5E3C] cursor-pointer"
                title="Volume control"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
