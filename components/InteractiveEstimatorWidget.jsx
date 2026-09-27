"use client";

import { useState } from "react";

export default function InteractiveEstimatorWidget() {
  const [propertyType, setPropertyType] = useState("3bhk");
  const [materialGrade, setMaterialGrade] = useState("premium");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Approximate cost estimates based on Vizag square footage and materials
  const estimates = {
    "2bhk": {
      premium: { min: 420000, max: 580000, desc: "Solid Teak & 100% IS:710 Marine Ply Kitchen + 2 Full Bedrooms" },
      balanced: { min: 310000, max: 410000, desc: "IS:710 Marine Ply Kitchen + IS:303 BWR Ply Wardrobes" },
      budget: { min: 250000, max: 280000, desc: "₹2.5 Lakhs 6-Item Package: Waterproof Gurjan BWP Ply for Kitchen & Wardrobe + Engineered Wood TV, Crockery, Dressing & Shoe Units" },
    },
    "3bhk": {
      premium: { min: 650000, max: 880000, desc: "Solid Teak Living & Dining + BWP Kitchen + 3 Luxury Wardrobes" },
      balanced: { min: 480000, max: 620000, desc: "BWP Marine Ply for wet zones + BWR Ply Wardrobes & TV Unit" },
      budget: { min: 340000, max: 450000, desc: "BWP Kitchen + Commercial Ply & 0.8mm Laminates" },
    },
    villa: {
      premium: { min: 1100000, max: 1650000, desc: "Burma Teak frames, BWP Island Kitchen, Walk-in Wardrobes, PU finishes" },
      balanced: { min: 820000, max: 1100000, desc: "C.P. Teak dining & doors, BWP modular kitchen, branded Hettich hardware" },
      budget: { min: 590000, max: 790000, desc: "IS:303/710 hybrid cabinetry with standard laminate surfaces" },
    },
    office: {
      premium: { min: 350000, max: 650000, desc: "Teak executive desks, acoustic wooden slat paneling, conference table" },
      balanced: { min: 240000, max: 380000, desc: "Commercial hardwood workstations, modular filing storage" },
      budget: { min: 160000, max: 250000, desc: "Sturdy modular laminates & compact workstations" },
    },
  };

  const currentEstimate = estimates[propertyType]?.[materialGrade] || estimates["3bhk"]["premium"];

  const formatINR = (val) => "₹" + val.toLocaleString("en-IN");

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitted(true);

    const message = encodeURIComponent(
      `Hi Sky Limits, I just calculated an interior estimate on your website!\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `🏠 Property: ${propertyType.toUpperCase()}\n` +
      `🪵 Material Grade: ${materialGrade.toUpperCase()}\n` +
      `💰 Estimated Range: ${formatINR(currentEstimate.min)} - ${formatINR(currentEstimate.max)}\n\n` +
      `Please contact me with a detailed itemized quote and showroom appointment.`
    );

    window.open(`https://wa.me/919959427831?text=${message}`, "_blank");
  };

  return (
    <section id="cost-estimator" className="w-full py-16 md:py-24 bg-[#FAF8F5] border-t border-[#EDE8DE]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-2">
            <span>📐</span> Transparent Pricing Engine
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#1E2A32] font-bold tracking-tight">
            Calculate Your Vizag Home Interior & Furniture Cost
          </h2>
          <p className="text-sm md:text-base text-[#1E2A32]/70 mt-2">
            Instant 3-step calculation based on raw material choices, moisture-proofing grades, and room dimensions.
          </p>
        </div>

        {/* 3-Step Interactive Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#EDE8DE] shadow-xl overflow-hidden p-6 sm:p-10">
          {/* Step 1: Property Type */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-3">
              <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Step 1: Select Property Type</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "2bhk", label: "2 BHK Flat", sub: "800 - 1100 sq.ft", icon: "🏢" },
                { id: "3bhk", label: "3 BHK Flat", sub: "1200 - 1800 sq.ft", icon: "🏡" },
                { id: "villa", label: "Duplex / Villa", sub: "2000+ sq.ft", icon: "🏰" },
                { id: "office", label: "Commercial Office", sub: "Custom Layout", icon: "💼" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPropertyType(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    propertyType === item.id
                      ? "border-[#8B5E3C] bg-[#8B5E3C]/5 ring-2 ring-[#8B5E3C]/20 shadow-xs"
                      : "border-[#EDE8DE] hover:border-[#8B5E3C]/50 bg-white"
                  }`}
                >
                  <span className="text-2xl mb-1 block">{item.icon}</span>
                  <p className="font-bold text-sm text-[#1E2A32]">{item.label}</p>
                  <p className="text-[11px] text-[#1E2A32]/60 mt-0.5">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Material Grade Selection */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-3">
              <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Step 2: Choose Raw Material & Durability Grade</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  id: "premium",
                  badge: "Recommended for Vizag Coast",
                  title: "Premium Teak & IS:710 Marine Ply",
                  desc: "Boiling water proof core, seasoned solid teak wood frames, SS 304 anti-rust soft close hinges.",
                  tag: "Highest Durability",
                },
                {
                  id: "balanced",
                  badge: "Smart Balance",
                  title: "Balanced Plywood Hybrid",
                  desc: "IS:710 Marine Ply for kitchen & sink, IS:303 BWR Ply for bedroom wardrobes & TV unit.",
                  tag: "Most Popular",
                },
                {
                  id: "budget",
                  badge: "Budget Friendly",
                  title: "Value Hardwood & MDF Hybrid",
                  desc: "Commercial hardwood ply with controlled MDF usage for CNC router patterns and headboards.",
                  tag: "Economical",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMaterialGrade(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    materialGrade === item.id
                      ? "border-[#8B5E3C] bg-[#8B5E3C]/5 ring-2 ring-[#8B5E3C]/20 shadow-xs"
                      : "border-[#EDE8DE] hover:border-[#8B5E3C]/50 bg-white"
                  }`}
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold text-[#8B5E3C] bg-[#8B5E3C]/10 px-2 py-0.5 rounded-full mb-1.5">
                      {item.tag}
                    </span>
                    <p className="font-bold text-sm text-[#1E2A32]">{item.title}</p>
                    <p className="text-xs text-[#1E2A32]/70 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Estimated Price Box & Lead Capture */}
          <div className="pt-6 border-t border-[#EDE8DE] bg-[#FAF8F5] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              {/* Calculated Range Display */}
              <div className="md:col-span-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C]">Estimated Price Range</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E2A32]">
                    {formatINR(currentEstimate.min)}
                  </span>
                  <span className="text-[#1E2A32]/60 text-lg">to</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#1E2A32]">
                    {formatINR(currentEstimate.max)}
                  </span>
                </div>
                <p className="text-xs text-[#1E2A32]/70 mt-1">{currentEstimate.desc}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                  <span>✓ Includes 3D visualization</span>
                  <span>•</span>
                  <span>✓ 10-Yr Warranty</span>
                  <span>•</span>
                  <span>✓ Factory Direct Vizag Rates</span>
                </div>
              </div>

              {/* Instant WhatsApp Lead Capture Form */}
              <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-[#EDE8DE] shadow-sm">
                <p className="text-xs font-bold text-[#1E2A32] mb-1">
                  Unlock Itemized Floor-Plan Quote on WhatsApp
                </p>
                <p className="text-[11px] text-[#1E2A32]/60 mb-3">
                  Get a complete room-by-room breakdown delivered straight to your phone.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FBFAF7] border border-[#EDE8DE] focus:outline-none focus:border-[#8B5E3C]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile No."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FBFAF7] border border-[#EDE8DE] focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    <span>Send Me Detailed Estimate via WhatsApp</span>
                  </button>
                </form>

                {submitted && (
                  <p className="text-[11px] text-emerald-700 font-semibold text-center mt-2">
                    ✓ Opening WhatsApp with your customized estimate...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
