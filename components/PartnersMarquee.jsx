"use client";

const PARTNERS = [
  { name: "TeakCraft India", industry: "Solid Teak Harvesters", badge: "Sustainable FSC" },
  { name: "Nordic Bouclé", industry: "Textile Mills Denmark", badge: "Organic Linen" },
  { name: "BrassForge Jaipur", industry: "Architectural Hardware", badge: "Hand-Poured Brass" },
  { name: "Loom & Timber", industry: "Upholstery Studios", badge: "Artisan Weave" },
  { name: "Komorebi Wood", industry: "Natural Oils & Lacquers", badge: "Zero-VOC Finish" },
  { name: "Aeterna Living", industry: "Interior Architecture", badge: "Design Collective" },
  { name: "Vizag Joinery Guild", industry: "Master Woodworkers", badge: "Heritage Guild" },
  { name: "Urban Hearth Co.", industry: "Home Accents", badge: "Exclusive Partner" },
];

export default function PartnersMarquee() {
  return (
    <section className="w-full py-16 bg-[#FBFAF7] border-y border-[#EDE8DE]/80 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-2">
          <span>❖</span> Trusted Craft Ecosystem
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-[#1E2A32] font-semibold">
          Our Partners & Collaborators
        </h2>
        <p className="text-xs md:text-sm text-[#1E2A32]/60 mt-1 max-w-md mx-auto">
          Collaborating with premier sawmills, artisanal textile houses, and sustainable forestry guilds across India & Europe.
        </p>
      </div>

      {/* Row 1 - Smooth auto-scrolling ticker moving left */}
      <div className="relative w-full overflow-hidden mb-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 items-center">
          {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-white border border-[#EDE8DE] hover:border-[#8B5E3C]/40 hover:shadow-md transition-all shrink-0 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EDE8DE]/60 flex items-center justify-center font-display font-bold text-[#8B5E3C] text-sm group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors">
                {partner.name[0]}
              </div>
              <div className="text-left">
                <p className="font-display font-semibold text-sm text-[#1E2A32] group-hover:text-[#8B5E3C] transition-colors">
                  {partner.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#1E2A32]/50">{partner.industry}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EDE8DE]/70 text-[#1E2A32]/70">
                    {partner.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Reverse scroll */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee-reverse gap-4 items-center">
          {[...PARTNERS.slice().reverse(), ...PARTNERS.slice().reverse()].map((partner, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-white border border-[#EDE8DE] hover:border-[#8B5E3C]/40 hover:shadow-md transition-all shrink-0 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#8B5E3C]/10 flex items-center justify-center font-display font-bold text-[#8B5E3C] text-sm group-hover:bg-[#8B5E3C] group-hover:text-white transition-colors">
                ✦
              </div>
              <div className="text-left">
                <p className="font-display font-semibold text-sm text-[#1E2A32] group-hover:text-[#8B5E3C] transition-colors">
                  {partner.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#1E2A32]/50">{partner.industry}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EDE8DE]/70 text-[#1E2A32]/70">
                    {partner.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
