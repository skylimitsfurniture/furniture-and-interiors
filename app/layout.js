import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import MegaMenu from "@/components/MegaMenu";
import RightSidebar from "@/components/RightSidebar";
import AIChatbot from "@/components/AIChatbot";
import AuthModal from "@/components/AuthModal";
import PricingModal from "@/components/PricingModal";
import FloatingContactActions from "@/components/FloatingContactActions";
import { AuthProvider } from "@/context/AuthContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});

export const metadata = {
  title: "Sky Limits Furniture | Custom Furniture & Coastal Interiors Visakhapatnam",
  description:
    "Custom manufacturing of solid teak wood furniture and 100% waterproof BWP Marine Ply modular kitchens in Visakhapatnam (near Railway New Colony / Santhipuram). Termite-proof & coastal weather durable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased bg-paper text-ink" suppressHydrationWarning>
        <AuthProvider>
          <MegaMenu />
          {children}
          <Footer />
          <RightSidebar />
          <FloatingContactActions />
          <AIChatbot />
          <AuthModal />
          <PricingModal />
        </AuthProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-12 bg-ink text-paper border-t border-cloud/10 pb-16 sm:pb-0">
      {/* Main Footer */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-12 grid gap-8 grid-cols-2 md:grid-cols-5 text-sm">
        {/* Brand & Mission Column */}
        <div className="col-span-2 space-y-3">
          <p className="font-display text-xl font-bold tracking-tight text-paper">
            SKY LIMITS <span className="text-brass">FURNITURE</span>
          </p>
          <p className="text-paper/70 text-xs max-w-sm leading-relaxed">
            Custom manufactured solid teakwood (టేకు) & IS:710 BWP marine plywood furnishings built in Visakhapatnam. Engineered to withstand coastal humidity, sea salt air, and termites.
          </p>
          <div className="text-xs text-paper/80 space-y-1 pt-1">
            <p className="font-semibold text-brass">📍 Visakhapatnam Showroom & Workshop:</p>
            <p className="text-paper/60 text-[11px]">
              Near Railway New Colony / Santhipuram, Visakhapatnam, Andhra Pradesh 530016
            </p>
            <p className="text-paper/60 text-[11px]">
              Direct Helpline: <a href="tel:+919959427831" className="text-brass hover:underline">+91 99594 27831</a>
            </p>
          </div>
        </div>

        {/* Column 1: Custom Services */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Custom Interiors
          </p>
          <ul className="space-y-1.5 text-xs text-paper/75">
            <li><a href="/services#modular-kitchen" className="hover:text-brass transition-colors">Modular Kitchens (IS:710)</a></li>
            <li><a href="/services#living-room" className="hover:text-brass transition-colors">Solid Teak Living Suites</a></li>
            <li><a href="/services#bedroom-wardrobes" className="hover:text-brass transition-colors">BWR Wardrobes & Cots</a></li>
            <li><a href="/services#dining-furniture" className="hover:text-brass transition-colors">6 & 8-Seater Dining Sets</a></li>
            <li><a href="/estimator" className="hover:text-brass transition-colors font-semibold text-brass">Interior Cost Estimator 📐</a></li>
          </ul>
        </div>

        {/* Column 2: Material Education */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Material Transparency
          </p>
          <ul className="space-y-1.5 text-xs text-paper/75">
            <li><a href="/materials" className="hover:text-brass transition-colors">Why Wood Choice Matters</a></li>
            <li><a href="/materials" className="hover:text-brass transition-colors">Solid Teak vs Marine Ply</a></li>
            <li><a href="/materials" className="hover:text-brass transition-colors">Coastal Weather Defense</a></li>
            <li><a href="/products" className="hover:text-brass transition-colors">140+ Catalog Items</a></li>
            <li><a href="/#video-showcase" className="hover:text-brass transition-colors">Workshop Video Showcase</a></li>
          </ul>
        </div>

        {/* Column 3: Vizag Locations Served */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Areas We Serve in Vizag
          </p>
          <p className="text-[11px] text-paper/65 leading-relaxed">
            Madhurawada, MVP Colony, Gajuwaka, Yendada, Waltair Uplands, Rushikonda, Seethammadhara, Dwaraka Nagar, Steel Plant Township.
          </p>

          {/* WhatsApp Action Button */}
          <div className="mt-4">
            <a
              href="https://wa.me/919959427831?text=Hi%20Sky%20Limits%2C%20I%20want%20to%20discuss%20custom%20furniture%2Finteriors%20for%20my%20home%20in%20Vizag."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-paper text-xs font-semibold shadow-sm transition-colors"
            >
              <span>💬</span>
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-paper/10 max-w-[1240px] mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-paper/40 gap-2">
        <p>© {new Date().getFullYear()} Sky Limits Furniture (Visakhapatnam). 100% Termite-Proof BWP Plywood & Seasoned Teakwood. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/materials" className="hover:text-paper/70 transition-colors">Material Standards</a>
          <span>•</span>
          <a href="/estimator" className="hover:text-paper/70 transition-colors">Cost Estimator</a>
          <span>•</span>
          <a href="/warranty" className="hover:text-paper/70 transition-colors">10-Year Warranty</a>
        </div>
      </div>
    </footer>
  );
}