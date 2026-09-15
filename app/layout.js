import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import MegaMenu from "@/components/MegaMenu";
import RightSidebar from "@/components/RightSidebar";
import AIChatbot from "@/components/AIChatbot";
import AuthModal from "@/components/AuthModal";
import PricingModal from "@/components/PricingModal";
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
  title: "Skylimits Furniture",
  description: "Furniture built to raise the ceiling on everyday living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body antialiased bg-paper text-ink">
        <AuthProvider>
          <MegaMenu />
          {children}
          <Footer />
          <RightSidebar />
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
    <footer className="mt-12 bg-ink text-paper border-t border-cloud/10">
      {/* Compact Main Footer */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-10 grid gap-8 grid-cols-2 md:grid-cols-5 text-sm">
        {/* Brand & Mission Column */}
        <div className="col-span-2">
          <p className="font-display text-xl font-bold tracking-tight text-paper">
            SKY LIMITS <span className="text-brass">FURNITURE</span>
          </p>
          <p className="text-paper/60 text-xs mt-2 max-w-sm leading-relaxed">
            Handcrafted solid timber furnishings finished in Visakhapatnam. Designed for spaces with more air and light.
          </p>
          {/* Quick Newsletter */}
          <div className="mt-4">
            <p className="text-[11px] font-semibold text-paper/70 uppercase tracking-wider mb-2">
              Join Our Artisan Dispatch
            </p>
            <form
              action="#"
              className="flex items-center gap-2 max-w-xs"
            >
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-3 py-1.5 rounded-lg bg-paper/10 border border-paper/15 text-xs text-paper placeholder-paper/40 focus:outline-none focus:border-brass"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-timber hover:bg-timberdark text-paper text-xs font-semibold shrink-0 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Column 1: Shop */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Collections
          </p>
          <ul className="space-y-1.5 text-xs text-paper/75">
            <li><a href="/products?category=Living%20Room" className="hover:text-brass transition-colors">Living Room</a></li>
            <li><a href="/products?category=Bedroom" className="hover:text-brass transition-colors">Bedroom</a></li>
            <li><a href="/products?category=Dining%20Room" className="hover:text-brass transition-colors">Dining Room</a></li>
            <li><a href="/products?category=Office" className="hover:text-brass transition-colors">Home Office</a></li>
            <li><a href="/products" className="hover:text-brass transition-colors">All 140+ Items</a></li>
          </ul>
        </div>

        {/* Column 2: Highlights */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Opportunities
          </p>
          <ul className="space-y-1.5 text-xs text-paper/75">
            <li><a href="/franchise" className="hover:text-brass transition-colors">Franchise Program</a></li>
            <li><a href="/pricing" className="hover:text-brass transition-colors">1K Club VIP Rewards</a></li>
            <li><a href="/events" className="hover:text-brass transition-colors">Workshop Events</a></li>
            <li><a href="/#video-showcase" className="hover:text-brass transition-colors">Brand Cinema</a></li>
            <li><a href="/custom" className="hover:text-brass transition-colors">Bespoke Orders</a></li>
          </ul>
        </div>

        {/* Column 3: Care & Connect */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-paper/45 mb-2.5">
            Connect
          </p>
          <p className="text-xs text-paper/70">
            Vizag Studio: +91 99594 27831
          </p>
          <p className="text-xs text-paper/50 mt-0.5">
            care@skylimitsfurniture.in
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 mt-3">
            {[
              { name: "Instagram", icon: "📸" },
              { name: "Pinterest", icon: "📌" },
              { name: "YouTube", icon: "▶️" },
              { name: "LinkedIn", icon: "💼" },
            ].map((s) => (
              <span
                key={s.name}
                className="w-7 h-7 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-xs cursor-pointer transition-colors"
                title={s.name}
              >
                {s.icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ultra-compact bottom copyright bar */}
      <div className="border-t border-paper/10 max-w-[1240px] mx-auto px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-paper/40 gap-2">
        <p>© {new Date().getFullYear()} Skylimits Furniture. Solid timber joinery. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-paper/70 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-paper/70 transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="/warranty" className="hover:text-paper/70 transition-colors">10-Year Warranty</a>
        </div>
      </div>
    </footer>
  );
}