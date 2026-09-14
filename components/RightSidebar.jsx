"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RightSidebar() {
  const {
    isSubscribed,
    aiQueryCount,
    aiQueryLimit,
    toggleChat,
    openPricingModal,
  } = useAuth();

  const [activeTooltip, setActiveTooltip] = useState(null);

  const queriesLeft = Math.max(0, aiQueryLimit - aiQueryCount);

  // Social Links configuration (100% Free Access)
  const socialLinks = [
    {
      id: "whatsapp",
      name: "WhatsApp Chat",
      href: "https://wa.me/919959427831?text=Hello%20Skylimits%20Furniture%2C%20I%27d%20like%20to%20know%20more%20about%20your%20handcrafted%20collections",
      bgColor: "bg-emerald-600 hover:bg-emerald-700 text-paper",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://www.instagram.com/skylimitsvisakhapatnam",
      bgColor: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-paper",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      name: "Facebook",
      href: "https://www.facebook.com/skylimitsvisakhapatnam",
      bgColor: "bg-blue-600 hover:bg-blue-700 text-paper",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
    },
    {
      id: "youtube",
      name: "YouTube Showcase",
      href: "https://www.youtube.com/@skylimitsvisakhapatnam",
      bgColor: "bg-red-600 hover:bg-red-700 text-paper",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Quick Actions and Social Hub"
      className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {/* 1. VIP Subscription Pill / Badge */}
      {!isSubscribed ? (
        <button
          type="button"
          onClick={openPricingModal}
          className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper/95 text-ink border border-amber-400/80 shadow-lg hover:shadow-xl hover:border-amber-500 hover:bg-amber-50/90 transition-all duration-300 text-xs font-semibold"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
          <span className="text-amber-700 font-bold">VIP Pro</span>
          <span className="text-ink/60 text-[11px] hidden group-hover:inline">
            • Unlock Perks →
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-sm">
          <span>👑</span>
          <span>VIP Member</span>
        </div>
      )}

      {/* 2. Free AI Chatbot Trigger Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={toggleChat}
          onMouseEnter={() => setActiveTooltip("chatbot")}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-timber text-paper shadow-2xl hover:bg-timberdark hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-paper"
          aria-label="Open Free AI Interior Stylist"
        >
          {/* Sparkles / Bot Icon */}
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>

          {/* Freemium counter pill */}
          {!isSubscribed && (
            <span
              className={`absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold border border-paper shadow-sm ${
                queriesLeft > 0
                  ? "bg-emerald-600 text-paper"
                  : "bg-flame text-paper animate-bounce"
              }`}
            >
              {queriesLeft > 0 ? `${queriesLeft}` : "0"}
            </span>
          )}

          {isSubscribed && (
            <span className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500 text-ink border border-paper shadow-sm">
              VIP
            </span>
          )}
        </button>

        {/* Floating Tooltip */}
        {activeTooltip === "chatbot" && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-ink text-paper text-xs font-medium py-1.5 px-3 rounded-xl whitespace-nowrap shadow-xl border border-paper/10 animate-in fade-in duration-150">
            <p className="font-semibold">Free AI Stylist</p>
            <p className="text-[11px] text-paper/70">
              {isSubscribed
                ? "Unlimited VIP access"
                : `${queriesLeft} of ${aiQueryLimit} free queries left`}
            </p>
          </div>
        )}
      </div>

      {/* 3. Social Media Hub (100% Free Access) */}
      <div className="flex flex-col gap-2 items-end pt-1">
        {socialLinks.map((item) => (
          <div key={item.id} className="relative group">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 border border-paper/30 ${item.bgColor}`}
              aria-label={item.name}
            >
              {item.icon}
            </a>

            {/* Hover Tooltip */}
            {activeTooltip === item.id && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-ink/95 backdrop-blur-sm text-paper text-xs py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg border border-paper/10 pointer-events-none">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
