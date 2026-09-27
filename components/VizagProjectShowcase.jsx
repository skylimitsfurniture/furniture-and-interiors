"use client";

import { useState } from "react";
import { vizagProjects } from "@/data/vizagData";

export default function VizagProjectShowcase() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  const locations = ["All", "MVP Colony", "Madhurawada", "Yendada", "Gajuwaka", "Waltair Uplands"];

  const filteredProjects =
    selectedLocation === "All"
      ? vizagProjects
      : vizagProjects.filter((p) => p.location.toLowerCase().includes(selectedLocation.toLowerCase()));

  return (
    <section className="w-full py-16 md:py-24 bg-[#FBFAF7]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🏡</span> Local Portfolio
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#1E2A32] font-bold tracking-tight">
              Homes We Have Handcrafted Across Visakhapatnam
            </h2>
            <p className="text-sm md:text-base text-[#1E2A32]/70 mt-2 max-w-xl">
              From oceanfront apartments in Sagar Nagar to expansive villas in Madhurawada, explore real Vizag homes built with 100% moisture-tested joinery.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLocation === loc
                    ? "bg-[#1E2A32] text-white shadow-sm"
                    : "bg-white text-[#1E2A32]/70 border border-[#EDE8DE] hover:border-[#8B5E3C]"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EDE8DE] hover:border-[#8B5E3C]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE8DE]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#8B5E3C] shadow-sm">
                  📍 {project.location}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-medium text-white/80 uppercase tracking-wider">{project.type}</p>
                  <p className="font-display text-base font-bold truncate">{project.title}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#1E2A32]/60 mb-2.5">
                    <span>Client: <strong className="text-[#1E2A32]">{project.client}</strong></span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      ⏱ {project.duration}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E3C]">Core Materials Used:</p>
                    <p className="text-xs font-semibold text-[#1E2A32] mt-0.5">{project.materials}</p>
                  </div>

                  {/* Highlights Pill list */}
                  <div className="space-y-1 mt-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#1E2A32]/75">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-5 pt-3 border-t border-[#EDE8DE] flex items-center justify-between">
                  <a
                    href={`https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20saw%20your%20project%20in%20${encodeURIComponent(
                      project.location
                    )}%20and%20want%20similar%20interiors%20for%20my%20home.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#8B5E3C] text-[#8B5E3C] hover:text-white font-semibold text-xs border border-[#EDE8DE] transition-all"
                  >
                    Request Similar Design Quote →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
