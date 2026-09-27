import Link from "next/link";

export const metadata = {
  title: "Custom Furniture & Modular Interior Services | Sky Limits Vizag",
  description:
    "End-to-end custom furniture manufacturing and modular interiors in Visakhapatnam. Living room sofa sets, teak dining tables, BWP modular kitchens, and wardrobes.",
};

const SERVICES = [
  {
    id: "modular-kitchen",
    title: "Coastal Modular Kitchens",
    tagline: "100% Boiling Water Proof (IS:710) with Anti-Rust SS 304 Hardware",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
    primaryMaterials: "IS:710 BWP Marine Plywood Core (PF Resin Fortified)",
    finishes: "1mm High-Pressure Anti-Scratch Acrylic, PU Lacquer, Textured Laminates",
    customization: "Full modular layouts: L-shape, U-shape, Island counter, custom spice pull-outs, tandem drawers",
    hardware: "Hettich / Hafele Soft-Close Hinges & Marine-Grade Rust-Proof Channels",
    popularLocations: "MVP Colony, Yendada, Madhurawada ocean-facing apartments",
  },
  {
    id: "living-room",
    title: "Living Room Suites & Sectionals",
    tagline: "Solid Teakwood Frames Joined with Heavy Mortise & Tenon Craft",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    primaryMaterials: "Seasoned Burma or C.P. Teak Wood (టేకు) Internal Skeleton",
    finishes: "D'Decor, Sarom & Rayna Fabrics (AquaClean, Charlie Micro-Suede, Velvet Royale, GM Jacquard)",
    customization: "L-shaped sectionals, 3+2+1 configurations, breathable linen-poly weaves, 32-40 high-density foam",
    hardware: "Solid brass base accents, concealed structural cross-bracing",
    popularLocations: "Seethammadhara, Waltair Uplands, Rushikonda villas",
  },
  {
    id: "bedroom-wardrobes",
    title: "Bedroom Furniture & Modular Wardrobes",
    tagline: "Termite-Treated Storage Solutions Engineered for Humid Sea Air",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
    primaryMaterials: "IS:303 BWR Hardwood Plywood for carcase + Teak/HDF decorative CNC panels",
    finishes: "Natural Teak Veneer with melamine finish, fluted glass profile doors, soft-touch laminates",
    customization: "Walk-in closets, sliding floor-to-ceiling wardrobes, hydraulic storage king cots",
    hardware: "Ebco heavy-duty sliding track systems, soft-close hydraulic gas-lift struts",
    popularLocations: "Madhurawada, Gajuwaka, Dwaraka Nagar",
  },
  {
    id: "dining-furniture",
    title: "Custom 6 & 8-Seater Dining Sets",
    tagline: "Generational Solid Teakwood Dining Tables & Ergonomic Chairs",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
    primaryMaterials: "100% Solid Indian C.P. Teak or Burma Teak Timber",
    finishes: "Natural Golden Teak polish, Italian PU clear coating, custom Rosewood / Walnut tinting",
    customization: "Rectangular, round pedestal, live-edge designs with matching cushioned chairs & bench seating",
    hardware: "Precision mortise-and-tenon wood joinery with stainless steel support plates",
    popularLocations: "Railway New Colony, Santhipuram, PM Palem",
  },
];

export default function ServicesPage() {
  const whatsappUrl =
    "https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20want%20to%20consult%20on%20custom%20furniture%20and%20interior%20services%20for%20my%20home%20in%20Vizag.";

  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#1E2A32] pb-24">
      {/* Services Header */}
      <section className="bg-gradient-to-b from-[#EDE8DE]/60 to-[#FBFAF7] py-14 md:py-20 border-b border-[#EDE8DE]">
        <div className="max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-4">
            <span>✨</span> Custom Manufacturing in Visakhapatnam
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E2A32]">
            Custom Furniture & Interior Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#1E2A32]/75 max-w-2xl mx-auto leading-relaxed">
            Tailor-made for Vizag residences. We don&apos;t ship generic flat-pack boxes from faraway factories—every piece is built to your room dimensions using coastal-tested timber and plywood.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#EDE8DE] shadow-xs">
              ✓ Free 3D Floor Plan Layouts
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#EDE8DE] shadow-xs">
              ✓ Direct Factory Pricing in Vizag
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#EDE8DE] shadow-xs">
              ✓ 10-Year Comprehensive Warranty
            </span>
          </div>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-14 space-y-12">
        {SERVICES.map((s, index) => (
          <div
            key={s.id}
            id={s.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#EDE8DE] shadow-md grid md:grid-cols-12 gap-0"
          >
            {/* Visual Frame */}
            <div
              className={`md:col-span-5 relative min-h-[300px] bg-[#EDE8DE]/40 ${
                index % 2 === 1 ? "md:order-last" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#8B5E3C] shadow-sm">
                0{index + 1}
              </div>
            </div>

            {/* Service Content */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1E2A32]">
                  {s.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#8B5E3C] mt-1 mb-5">
                  {s.tagline}
                </p>

                {/* 3 Key Specs required by prompt */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3 bg-[#FBFAF7] rounded-xl border border-[#EDE8DE]">
                    <span className="font-bold text-[#1E2A32] block text-xs uppercase tracking-wider mb-0.5">
                      1. Primary Material Used:
                    </span>
                    <span className="text-[#1E2A32]/85">{s.primaryMaterials}</span>
                  </div>

                  <div className="p-3 bg-[#FBFAF7] rounded-xl border border-[#EDE8DE]">
                    <span className="font-bold text-[#1E2A32] block text-xs uppercase tracking-wider mb-0.5">
                      2. Finish Options:
                    </span>
                    <span className="text-[#1E2A32]/85">{s.finishes}</span>
                  </div>

                  <div className="p-3 bg-[#FBFAF7] rounded-xl border border-[#EDE8DE]">
                    <span className="font-bold text-[#1E2A32] block text-xs uppercase tracking-wider mb-0.5">
                      3. Customization Scope:
                    </span>
                    <span className="text-[#1E2A32]/85">{s.customization}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#1E2A32]/70 pt-1">
                    <span className="font-semibold text-emerald-800">Hardware:</span>
                    <span>{s.hardware}</span>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="mt-8 pt-4 border-t border-[#EDE8DE] flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                    s.title
                  )}%20for%20my%20home%20in%20Vizag.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Get Custom Quote on WhatsApp →
                </a>

                <Link
                  href="/estimator"
                  className="px-4 py-2.5 rounded-xl bg-[#FBFAF7] hover:bg-[#EDE8DE] text-[#1E2A32] font-semibold text-xs border border-[#EDE8DE] transition-all"
                >
                  Calculate Cost 📐
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Featured ₹2,50,000 2 BHK Package Spotlight */}
        <div id="2bhk-package" className="bg-gradient-to-br from-[#1E2A32] to-[#2B3E4C] text-[#FBFAF7] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#8B5E3C]/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5E3C] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <span>🔥</span> Best-Value Turnkey Package
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sky Limits 2 BHK Essential Interior Package — ₹2,50,000
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
                Aggressive direct-factory pricing for 6 essential items. Strategic material allocation: Waterproof Gurjan Marine Plywood for wet zones & Engineered Wood for dry areas.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block">Fixed Base Price</span>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">₹2,50,000</span>
            </div>
          </div>

          {/* 6 Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[
              {
                num: "01",
                item: "Bedroom Cupboard / Wardrobe",
                mat: "Waterproof Gurjan Marine Plywood (BWP IS:710)",
                finish: "1 mm Sunmica with 8 mm Backing Substrate",
                badge: "Wet/Moisture Proof",
                badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
              },
              {
                num: "02",
                item: "Kitchen Units (Single Wall - Stove Side)",
                mat: "Waterproof Gurjan Marine Plywood (BWP IS:710)",
                finish: "Top & Bottom Cabinets in 1 mm Sunmica",
                badge: "100% Water Impervious",
                badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
              },
              {
                num: "03",
                item: "Living Room TV Unit",
                mat: "Engineered Wood / MDF / HDF",
                finish: "PVC / Textured Laminate Finish",
                badge: "Dry Zone Budget Smart",
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
              },
              {
                num: "04",
                item: "Dining Crockery Unit",
                mat: "Engineered Wood / MDF / HDF",
                finish: "Decorative Laminate Display",
                badge: "Dry Zone Budget Smart",
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
              },
              {
                num: "05",
                item: "Bedroom Dressing Table",
                mat: "Engineered Wood / MDF / HDF",
                finish: "Mirror Console & Storage Drawers",
                badge: "Dry Zone Budget Smart",
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
              },
              {
                num: "06",
                item: "Foyer Shoe Rack",
                mat: "Engineered Wood / MDF / HDF",
                finish: "Ventilated Storage Shutters",
                badge: "Dry Zone Budget Smart",
                badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
              },
            ].map((p) => (
              <div key={p.num} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-white/50">{p.num}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-white">{p.item}</p>
                  <p className="text-xs text-amber-200/90 font-medium mt-1">{p.mat}</p>
                  <p className="text-[11px] text-white/60 mt-0.5">{p.finish}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Standard Hardware & Execution Footnote */}
          <div className="mt-6 pt-5 border-t border-white/10 grid sm:grid-cols-2 gap-4 text-xs text-white/75">
            <div className="space-y-1">
              <p className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-300">
                Included Hardware & Specifications:
              </p>
              <p>• Stainless Steel (SS 304 Grade) handles & premium bonus/mortise locks.</p>
              <p>• 1 mm decorative Sunmica (with 8 mm carcass structural backing ply).</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <p className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-300">
                Transparent Contractor Guardrail:
              </p>
              <p>• Covers standard room dimension square footage caps.</p>
              <p>• Final quote confirmed on site laser measurement. Upgrades to full Gurjan available.</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <a
              href="https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20am%20interested%20in%20the%20Rs%202%2C50%2C000%20(2%20BHK)%206-Item%20Interior%20Package.%20Please%20share%20measurement%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>💬</span>
              <span>Claim ₹2.5 Lakhs 2 BHK Package via WhatsApp</span>
            </a>
            <a
              href="tel:+919959427831"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
            >
              📞 Call Consultant (+91 99594 27831)
            </a>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-[#EDE8DE]/50 border border-[#EDE8DE] text-center max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-[#1E2A32]">
            Need a Complete Home Interior Consultation?
          </h3>
          <p className="text-sm text-[#1E2A32]/70 mt-2 leading-relaxed">
            Our interior architects will visit your flat or villa anywhere in Visakhapatnam (Madhurawada to Gajuwaka) for on-site laser measurements and 3D space planning.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919959427831"
              className="px-6 py-3 rounded-xl bg-[#1E2A32] text-white font-semibold text-xs shadow-md"
            >
              Call +91 99594 27831
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
            >
              Book Site Visit via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
