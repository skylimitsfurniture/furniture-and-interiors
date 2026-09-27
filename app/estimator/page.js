import InteractiveEstimatorWidget from "@/components/InteractiveEstimatorWidget";
import Link from "next/link";

export const metadata = {
  title: "Interactive Interior Cost Estimator | Sky Limits Furniture Vizag",
  description:
    "Calculate your 2BHK, 3BHK, Villa, or Office interior costs in Visakhapatnam. Accurate estimates based on Teak Wood, BWP Marine Plywood, and BWR grades.",
};

export default function EstimatorPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#1E2A32] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-b from-[#EDE8DE]/60 to-[#FBFAF7] py-12 md:py-16 border-b border-[#EDE8DE]">
        <div className="max-w-[1140px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-3">
            <span>📐</span> 100% Transparent Estimates
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E2A32]">
            Vizag Interior Cost Estimator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#1E2A32]/75 max-w-xl mx-auto">
            Choose your floor plan and select your raw material preference to instantly see realistic turnkey costs. No hidden contractor margins.
          </p>
        </div>
      </section>

      {/* Main Interactive Widget */}
      <div className="mt-4">
        <InteractiveEstimatorWidget />
      </div>

      {/* FAQs regarding interior pricing in Vizag */}
      <section className="max-w-[880px] mx-auto px-4 md:px-8 mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-[#1E2A32] text-center mb-6">
          Frequently Asked Questions About Interior Costs in Vizag
        </h2>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE8DE] space-y-2">
          <p className="font-bold text-sm text-[#1E2A32]">
            Q: Why is BWP Marine Plywood slightly higher priced than commercial ply?
          </p>
          <p className="text-xs sm:text-sm text-[#1E2A32]/75 leading-relaxed">
            IS:710 Marine Ply uses un-extended phenolic resins and selected hardwood veneers that undergo high-pressure hydraulic pressing. This guarantees that your kitchen carcase will never swell or rot, saving thousands of rupees in replacement costs during Vizag&apos;s humid monsoons.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE8DE] space-y-2">
          <p className="font-bold text-sm text-[#1E2A32]">
            Q: Are showroom visits and site measurements free in Visakhapatnam?
          </p>
          <p className="text-xs sm:text-sm text-[#1E2A32]/75 leading-relaxed">
            Yes, our design team provides zero-charge initial site visits across all Vizag neighborhoods including Madhurawada, MVP Colony, Gajuwaka, Rushikonda, and Santhipuram to take laser measurements.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE8DE] space-y-2">
          <p className="font-bold text-sm text-[#1E2A32]">
            Q: What payment terms and warranty are provided?
          </p>
          <p className="text-xs sm:text-sm text-[#1E2A32]/75 leading-relaxed">
            We operate on milestone-based transparent stages (Design approval, factory fabrication, pre-delivery inspection at our Vizag workshop, and final on-site installation). All woodwork includes our 10-Year written structural and termite warranty.
          </p>
        </div>
      </section>
    </main>
  );
}
