"use client";

import { useState } from "react";
import Link from "next/link";

export default function VizagHero() {
  const whatsappUrl =
    "https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20want%20to%20discuss%20custom%20furniture%2Finteriors%20for%20my%20home%20in%20Vizag.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EEE5] to-[#FBFAF7] pt-8 pb-14 border-b border-[#EDE8DE]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B08D57]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-[#8B5E3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative z-10">
        {/* Top Local Trust Badges Strip */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-6 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#5E3E27] border border-[#8B5E3C]/20 shadow-xs">
            <span>🛡️</span> 100% Termite-Treated Timber
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 shadow-xs">
            <span>💧</span> IS:710 BWP Waterproof Core
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs">
            <span>⚓</span> Coastal Anti-Rust SS 304 Fittings
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shadow-xs">
            <span>📍</span> Vizag Showroom: Near Railway New Colony
          </span>
        </div>

        {/* Hero Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E3C]">
              <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-ping" />
              Direct Workshop Manufacturing in Visakhapatnam
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#1E2A32] font-bold leading-[1.12] tracking-tight">
              Custom Furniture & <br className="hidden sm:inline" />
              <span className="text-[#8B5E3C] italic font-normal">Coastal-Durable</span> Interiors in Visakhapatnam
            </h1>

            <p className="text-base sm:text-lg text-[#1E2A32]/80 leading-relaxed font-body max-w-2xl">
              <strong className="text-[#1E2A32] font-semibold">100% Termite-Proof BWP Marine Ply & Seasoned Teak Wood (టేకు).</strong>{" "}
              Custom engineered specifically for Vizag&apos;s humidity, sea salt air, and termite conditions with zero particle board shortcuts.
            </p>

            {/* High-Intent CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>💬</span>
                <span>Get Instant Quote via WhatsApp</span>
              </a>

              <a
                href="tel:+919959427831"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1E2A32] font-semibold text-sm border-2 border-[#1E2A32]/15 hover:border-[#8B5E3C] shadow-xs transition-all hover:scale-[1.02]"
              >
                <span>📞</span>
                <span>Call Showroom (+91 99594 27831)</span>
              </a>

              <Link
                href="/estimator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#8B5E3C] hover:bg-[#5E3E27] text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <span>📐</span>
                <span>Estimate Interior Cost</span>
              </Link>
            </div>

            {/* Quick Proof Counters */}
            <div className="pt-4 border-t border-[#EDE8DE] grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">1,200+</p>
                <p className="text-xs text-[#1E2A32]/70 font-medium">Vizag Homes Furnished</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">IS:710</p>
                <p className="text-xs text-[#1E2A32]/70 font-medium">Certified Marine Grade</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">10 Years</p>
                <p className="text-xs text-[#1E2A32]/70 font-medium">Termite & Joinery Warranty</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card with Local Workshop Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11] bg-[#EDE8DE]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Sky Limits Furniture Custom Interior in Visakhapatnam"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A32]/90 via-[#1E2A32]/30 to-transparent" />

              {/* Floating Quality Stamp */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#EDE8DE] flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#8B5E3C]">Coastal Shield</p>
                  <p className="text-xs font-bold text-[#1E2A32]">Zero Swelling Guarantee</p>
                </div>
              </div>

              {/* Bottom Card Copy */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                <div className="inline-flex items-center gap-1.5 bg-[#8B5E3C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5">
                  <span>📍</span> Completed in MVP Colony, Vizag
                </div>
                <p className="font-display text-lg font-bold">Solid Burma Teak Dining & Waterproof Kitchen</p>
                <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                  100% IS:710 BWP plywood core with stainless steel rust-free hardware.
                </p>
              </div>
            </div>

            {/* Showroom Visit Micro-card */}
            <div className="mt-3 bg-white p-3.5 rounded-2xl border border-[#EDE8DE] shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B5E3C]/10 text-[#8B5E3C] flex items-center justify-center font-bold text-lg shrink-0">
                  🏬
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E2A32]">Experience In Person in Vizag</p>
                  <p className="text-[11px] text-[#1E2A32]/60">Railway New Colony / Santhipuram Showroom</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Visakhapatnam+Sky+Limits+Furniture"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#8B5E3C] hover:text-white border border-[#EDE8DE] text-xs font-semibold text-[#8B5E3C] transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
