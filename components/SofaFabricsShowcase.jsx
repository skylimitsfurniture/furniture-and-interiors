"use client";

import { useState } from "react";
import Image from "next/image";
import {
  sofaFabricBrands,
  coastalFabricGuide,
  vizagSourcingHubs,
} from "@/data/sofaFabricsData";

export default function SofaFabricsShowcase() {
  const [activeTab, setActiveTab] = useState("climate"); // "climate" | "brands" | "hubs"

  return (
    <section className="w-full py-14 bg-white rounded-3xl border border-[#EDE8DE] shadow-sm overflow-hidden my-10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🛋️</span> Vizag Upholstery & Sofa Cloth Guide
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#1E2A32] font-bold tracking-tight">
              Most Popular Sofa Cloth Brands & Coastal Climate Guide
            </h2>
            <p className="text-sm md:text-base text-[#1E2A32]/75 mt-2 max-w-2xl leading-relaxed">
              Vizag’s salt-laden coastal humidity demands carefully selected upholstery. Discover top catalog brands, climate-tested weaves, and local upholstery sourcing hubs across Visakhapatnam.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EDE8DE]">
            <button
              onClick={() => setActiveTab("climate")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "climate"
                  ? "bg-[#8B5E3C] text-white shadow-sm"
                  : "text-[#1E2A32]/80 hover:text-[#8B5E3C]"
              }`}
            >
              Coastal Climate Recommendations
            </button>
            <button
              onClick={() => setActiveTab("brands")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "brands"
                  ? "bg-[#8B5E3C] text-white shadow-sm"
                  : "text-[#1E2A32]/80 hover:text-[#8B5E3C]"
              }`}
            >
              Popular Brands in Vizag
            </button>
            <button
              onClick={() => setActiveTab("hubs")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "hubs"
                  ? "bg-[#8B5E3C] text-white shadow-sm"
                  : "text-[#1E2A32]/80 hover:text-[#8B5E3C]"
              }`}
            >
              Where Vizagites Source
            </button>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-[#EDE8DE] shadow-md group">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#EDE8DE]/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vizag_sofa_fabrics_showcase_1790102086202.jpg"
              alt="Upholstered sofa and fabric swatches in coastal Visakhapatnam apartment"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A32]/90 via-[#1E2A32]/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold w-fit mb-2 border border-white/30">
                Oceanfront Tested Living Solutions
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold max-w-xl">
                Fabric selection engineered for Vizag’s coastal humidity & tropical breeze.
              </h3>
              <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                We pair kiln-dried seasoned teak wood frames with premium breathable and water-repellent fabrics from D’Decor, Sarom, Rayna, and GM Fabrics.
              </p>
            </div>
          </div>
        </div>

        {/* Tab 1: Coastal Climate Recommendations */}
        {activeTab === "climate" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-8 overflow-x-auto rounded-2xl border border-[#EDE8DE] bg-[#FAF8F5]/50">
                <table className="w-full text-left text-sm border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#EDE8DE] text-xs uppercase tracking-wider text-[#1E2A32]/80">
                      <th className="py-4 px-5 font-bold w-1/3">Fabric Category</th>
                      <th className="py-4 px-5 font-bold w-1/3">Local Usage Preference</th>
                      <th className="py-4 px-5 font-bold w-1/3">Climate & Maintenance Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE8DE] bg-white">
                    {coastalFabricGuide.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-4 px-5 align-top">
                          <p className="font-bold text-[#1E2A32]">{item.category}</p>
                          <span
                            className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${item.badgeColor}`}
                          >
                            {item.preferenceBadge}
                          </span>
                        </td>
                        <td className="py-4 px-5 align-top">
                          <p className="text-sm font-semibold text-[#8B5E3C]">{item.preference}</p>
                          <p className="text-xs text-[#1E2A32]/70 mt-1">{item.care}</p>
                        </td>
                        <td className="py-4 px-5 align-top text-xs text-[#1E2A32]/80 leading-relaxed">
                          <p>{item.reason}</p>
                          <p className="mt-1 text-[11px] font-medium text-emerald-800">
                            🛡️ {item.antiCoastalRisk}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Side Artisan Visual */}
              <div className="md:col-span-4 rounded-2xl overflow-hidden border border-[#EDE8DE] relative flex flex-col justify-between bg-white shadow-xs">
                <div className="relative aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vizag_upholstery_craft_1790102130674.jpg"
                    alt="Visakhapatnam upholstery master craftsman tailoring sofa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E2A32]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white">
                    Vizag Master Joinery
                  </div>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-t border-[#EDE8DE]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#8B5E3C]">
                    Sky Limits Custom Tailoring
                  </h4>
                  <p className="text-xs text-[#1E2A32]/75 mt-1 leading-relaxed">
                    Our local master upholsterers hand-stitch high-GSM breathable covers with double-reinforced piping and high-resilience 32-40 density foam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Popular Brands in Vizag */}
        {activeTab === "brands" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-12 gap-6 items-start">
              {/* Swatch Image */}
              <div className="md:col-span-4 rounded-2xl overflow-hidden border border-[#EDE8DE] bg-white shadow-sm">
                <div className="relative aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/fabric_brands_swatches_1790102109147.jpg"
                    alt="D'Decor, Sarom, Rayna and GM Fabrics catalog books"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1E2A32] shadow-xs">
                    Sample Books Available in Studio
                  </div>
                </div>
                <div className="p-4 bg-[#FAF8F5] border-t border-[#EDE8DE]">
                  <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">
                    Physical Catalog Browsing
                  </p>
                  <p className="text-xs text-[#1E2A32]/75 mt-1 leading-relaxed">
                    Touch, feel, and compare water-repellency across 200+ fabric swatches in our Visakhapatnam workshop.
                  </p>
                </div>
              </div>

              {/* Brand Cards Grid */}
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                {sofaFabricBrands.map((brand) => (
                  <div
                    key={brand.name}
                    className="p-5 rounded-2xl bg-white border border-[#EDE8DE] hover:border-[#8B5E3C]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-display text-lg font-bold text-[#1E2A32]">
                          {brand.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${brand.tagColor}`}
                        >
                          {brand.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#1E2A32]/80 leading-relaxed mb-3">
                        {brand.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {brand.lines.map((line, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 bg-[#FAF8F5] border border-[#EDE8DE] rounded-md text-[#1E2A32]/70 font-medium"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#EDE8DE] text-[11px] space-y-1">
                      <p className="text-[#8B5E3C] font-semibold">
                        <span className="text-[#1E2A32]/60">Best For: </span>
                        {brand.bestFor}
                      </p>
                      <p className="text-[#1E2A32]/60">
                        📍 <span>{brand.hubs}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Where Vizagites Source & Custom-Upholster */}
        {activeTab === "hubs" && (
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {vizagSourcingHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EDE8DE] flex flex-col justify-between shadow-xs hover:border-[#8B5E3C]/40 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#8B5E3C]/10 text-[#8B5E3C] flex items-center justify-center font-bold text-lg mb-4">
                    📍
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#1E2A32] mb-1">
                    {hub.hub}
                  </h4>
                  <p className="text-xs font-semibold text-[#8B5E3C] mb-3">
                    {hub.character}
                  </p>
                  <p className="text-xs sm:text-sm text-[#1E2A32]/75 leading-relaxed">
                    {hub.offerings}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#EDE8DE] text-[11px] text-[#1E2A32]/60 font-medium">
                  Verified Local Partner Network • Visakhapatnam
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
