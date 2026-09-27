import Link from "next/link";
import MaterialComparisonTable from "@/components/MaterialComparisonTable";
import SofaFabricsShowcase from "@/components/SofaFabricsShowcase";
import VizagProjectShowcase from "@/components/VizagProjectShowcase";

export const metadata = {
  title: "Material Transparency & Coastal Durability Guide | Sky Limits Furniture Vizag",
  description:
    "Why wood choice matters in Visakhapatnam. Detailed comparison between Solid Teak Wood, IS:710 BWP Marine Plywood, BWR Plywood, and MDF for high-humidity coastal conditions.",
};

export default function MaterialsPage() {
  const whatsappUrl =
    "https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20read%20your%20Material%20Guide%20and%20want%20to%20consult%20on%20wood%20selection%20for%20my%20home.";

  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#1E2A32] pb-24">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#EDE8DE]/70 to-[#FBFAF7] py-14 md:py-20 border-b border-[#EDE8DE]">
        <div className="max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🛡️</span> Coastal Engineering & Complete Transparency
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E2A32]">
            Why Wood Choice Matters in Visakhapatnam
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#1E2A32]/75 max-w-2xl mx-auto leading-relaxed">
            Vizag&apos;s tropical sea breeze carries high moisture, humidity spikes above 85%, and airborne salt. Choosing the wrong wood or cheap particle board leads to fungal rot, peeling laminates, and sagging shelves within 18 months.
          </p>
        </div>
      </section>

      {/* Core Material Pillars */}
      <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 space-y-16">
        {/* 1. Solid Teak Wood */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE8DE] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[#EDE8DE] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪵</span>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1E2A32]">
                  1. Solid Teak Wood (టేకు)
                </h2>
                <p className="text-xs font-semibold text-[#8B5E3C]">
                  Burma Teak (High-End) & Indian / C.P. Teak (Durable Standard)
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
              Grade A Coastal Wood
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3 text-sm text-[#1E2A32]/80 leading-relaxed">
              <p>
                <strong className="text-[#1E2A32]">Positioning:</strong> The undisputed gold standard for main doors, heavy living room sofa structures, 6-seater dining table tops, and master cots.
              </p>
              <p>
                <strong className="text-[#1E2A32]">Why It Excels in Vizag:</strong> Teak is naturally saturated with organic oils and silica. These internal oils act as a permanent waterproof barrier against humid marine air, preventing warping, shrinkage, and termite infestation.
              </p>
              <p>
                <strong className="text-[#1E2A32]">Finishes:</strong> Hand-rubbed PU matte, natural open-pore oil polish, or custom Italian walnut stains.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EDE8DE] space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C]">Sky Limits Promise:</p>
              <ul className="text-xs space-y-1.5 text-[#1E2A32]/75">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% seasoned timber kiln-dried to 8%–12% moisture level before carving.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Zero white sapwood mix (we use only heartwood for load-bearing sections).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>No synthetic composite fillers masquerading as solid timber.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. BWP Marine Plywood IS:710 */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE8DE] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[#EDE8DE] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💧</span>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1E2A32]">
                  2. BWP Marine Plywood (IS:710 Grade)
                </h2>
                <p className="text-xs font-semibold text-blue-800">
                  Boiling Water Proof • 72-Hour Immersion Certified
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
              Non-Negotiable Core for Kitchens
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3 text-sm text-[#1E2A32]/80 leading-relaxed">
              <p>
                <strong className="text-[#1E2A32]">Positioning:</strong> The mandatory foundation for all modular kitchens, kitchen sink modules, utility areas, and bathroom vanity units.
              </p>
              <p>
                <strong className="text-[#1E2A32]">Why It Excels in Vizag:</strong> Bonded with fortified Phenol Formaldehyde (PF) synthetic resin under intense hydraulic heat. Even if your kitchen sink leaks or high coastal humidity envelops the carcase, IS:710 grade will never swell, soften, or delaminate.
              </p>
              <p>
                <strong className="text-[#1E2A32]">Termite Resistance:</strong> Chemically treated with anti-termite and borer-proof emulsions throughout each cross-grain layer.
              </p>
            </div>

            <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Why Market Competitors Avoid It:</p>
              <p className="text-xs text-[#1E2A32]/75 leading-relaxed">
                IS:710 Marine Ply costs 30% to 45% more than commercial plywood or particle board. Low-cost interior contractors cut corners by substituting interior boxes with commercial ply or MDF, resulting in bloated boards when monsoon moisture strikes.
              </p>
            </div>
          </div>
        </div>

        {/* 3. BWR Plywood IS:303 vs MDF */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* BWR Plywood */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📦</span>
                <h3 className="font-display text-xl font-bold text-[#1E2A32]">
                  3. BWR / Commercial Ply (IS:303)
                </h3>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold mb-3">
                Dry Zone Champion
              </span>
              <p className="text-xs sm:text-sm text-[#1E2A32]/80 leading-relaxed mb-3">
                <strong>Where We Use It:</strong> Bedroom wardrobes, TV display consoles, study workstations, and foyer shoe cabinets.
              </p>
              <p className="text-xs sm:text-sm text-[#1E2A32]/80 leading-relaxed">
                <strong>Benefit:</strong> Excellent load-bearing strength, high screw-holding capacity, and budget optimization for living areas that do not experience continuous water contact.
              </p>
            </div>
          </div>

          {/* MDF / HDF Controlled Usage */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎨</span>
                <h3 className="font-display text-xl font-bold text-[#1E2A32]">
                  4. MDF / HDF (Controlled Usage)
                </h3>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-[11px] font-bold mb-3">
                Aesthetic CNC & Paint Surfaces Only
              </span>
              <p className="text-xs sm:text-sm text-[#1E2A32]/80 leading-relaxed mb-3">
                <strong>Where We Use It:</strong> CNC router carving, acoustic grooved wall paneling, bed headboard patterns, and flawless PU paint finishes.
              </p>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 leading-relaxed">
                <strong>Transparency Note:</strong> Sky Limits <em>never</em> uses MDF for kitchen carcases, under-sink units, or base cabinets in Vizag.
              </div>
            </div>
          </div>
        </div>

        {/* 4. What We Strictly Avoid */}
        <div className="bg-red-50/50 rounded-3xl p-6 sm:p-10 border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🚫</span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-red-950">
              What We Avoid & Why (Coastal Protection Checklist)
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm text-red-900">
            <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60">
              <p className="font-bold text-[#1E2A32] mb-1">Particle Board / Low-Grade Chipboard</p>
              <p className="text-xs text-[#1E2A32]/70 leading-relaxed">
                Made from compressed sawdust. Absorbs coastal moisture like a sponge, swells rapidly, and strips screws easily.
              </p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60">
              <p className="font-bold text-[#1E2A32] mb-1">Unseasoned Foreign Hardwoods</p>
              <p className="text-xs text-[#1E2A32]/70 leading-relaxed">
                Imported Walnut or Ebony woods that have not acclimated to Vizag&apos;s severe humidity cycle will hairline crack. We recommend seasoned Teak with rich Walnut stains instead.
              </p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-red-200/60">
              <p className="font-bold text-[#1E2A32] mb-1">Solid Rosewood (ఇటిక)</p>
              <p className="text-xs text-[#1E2A32]/70 leading-relaxed">
                Exorbitant procurement wait times and high cost. We offer high-grade C.P. Teak treated with hand-rubbed Rosewood polishes for identical richness.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Material Standards Table */}
        <div className="pt-4">
          <MaterialComparisonTable />
        </div>

        {/* Vizag Sofa Fabrics & Coastal Upholstery Guide */}
        <div className="pt-4">
          <SofaFabricsShowcase />
        </div>

        {/* Local Vizag Completed Projects */}
        <div className="pt-4">
          <VizagProjectShowcase />
        </div>

        {/* Call to Action Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1E2A32] to-[#364958] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-2xl font-bold">Inspect Timber & Cross-Sections in Person</h3>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
              Visit our Vizag showroom near Railway New Colony / Santhipuram to see submerged ply samples and raw seasoned teak log cross-cuts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Book Showroom Visit →
            </a>
            <Link
              href="/estimator"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
            >
              Estimate Interior Cost
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
