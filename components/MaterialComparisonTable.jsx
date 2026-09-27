"use client";

import { useState } from "react";
import { materialStandards } from "@/data/vizagData";
import Link from "next/link";

export default function MaterialComparisonTable() {
  const [filterCriticalOnly, setFilterCriticalOnly] = useState(false);

  const displayedRows = filterCriticalOnly
    ? materialStandards.filter((item) => item.isCritical)
    : materialStandards;

  return (
    <section className="w-full py-16 md:py-20 bg-white border-b border-[#EDE8DE]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <span>⚖️</span> Material Transparency & Coastal Defense
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#1E2A32] font-bold tracking-tight">
              Sky Limits Standard vs. Common Market Shortcuts
            </h2>
            <p className="text-sm md:text-base text-[#1E2A32]/70 mt-2 max-w-2xl">
              Why Vizag homeowners regret modular furniture within 2 monsoons: Coastal humidity demands boiling-water-proof (IS:710) plywood and naturally oiled Teak wood. Here is our direct side-by-side comparison:
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setFilterCriticalOnly(!filterCriticalOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filterCriticalOnly
                  ? "bg-[#8B5E3C] text-white border-[#8B5E3C] shadow-sm"
                  : "bg-[#FBFAF7] text-[#1E2A32] border-[#EDE8DE] hover:border-[#8B5E3C]"
              }`}
            >
              {filterCriticalOnly ? "Showing Critical Only (Reset)" : "Show High-Risk Coastal Factors Only"}
            </button>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#EDE8DE] shadow-sm bg-white">
          <table className="w-full text-left text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EDE8DE] text-xs uppercase tracking-wider text-[#1E2A32]/80">
                <th className="py-4 px-5 font-bold w-1/4">Component / Element</th>
                <th className="py-4 px-5 font-bold w-3/8 bg-[#8B5E3C]/10 text-[#5E3E27]">
                  <div className="flex items-center gap-2">
                    <span>🌟</span> Sky Limits Standard (Engineered for Vizag)
                  </div>
                </th>
                <th className="py-4 px-5 font-bold w-3/8 text-red-900 bg-red-50/60">
                  <div className="flex items-center gap-2">
                    <span>⚠️</span> Typical Market Standard (High Risk)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8DE]">
              {displayedRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#FAF8F5]/80 transition-colors ${
                    row.isCritical ? "bg-amber-50/20" : ""
                  }`}
                >
                  <td className="py-4 px-5 align-top">
                    <div className="font-semibold text-[#1E2A32]">{row.feature}</div>
                    {row.isCritical && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Critical for Coastal Air
                      </span>
                    )}
                  </td>

                  {/* Sky Limits Value */}
                  <td className="py-4 px-5 align-top bg-[#8B5E3C]/5 border-x border-[#EDE8DE]">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold text-base mt-0.5">✓</span>
                      <div>
                        <p className="font-semibold text-[#1E2A32]">{row.skyLimits}</p>
                        <span className="inline-block mt-1 text-[11px] font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {row.skyLimitsBadge}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Typical Market Standard */}
                  <td className="py-4 px-5 align-top bg-red-50/30">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold text-base mt-0.5">✗</span>
                      <div>
                        <p className="font-medium text-[#1E2A32]/90">{row.marketStandard}</p>
                        <p className="mt-1 text-xs text-red-700/90 font-normal">
                          {row.marketRisk}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education Bottom Callout */}
        <div className="mt-6 p-5 rounded-2xl bg-[#EDE8DE]/40 border border-[#EDE8DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪵</span>
            <div>
              <p className="text-sm font-bold text-[#1E2A32]">
                Want to see raw timber and cross-section ply samples before ordering?
              </p>
              <p className="text-xs text-[#1E2A32]/70 mt-0.5">
                Visit our Railway New Colony workshop or read our comprehensive Wood & Coastal Resilience Guide.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/materials"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#8B5E3C] hover:text-white border border-[#EDE8DE] text-xs font-semibold text-[#8B5E3C] transition-all shadow-xs"
            >
              Read Material Guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
