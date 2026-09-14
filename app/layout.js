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
    <footer className="mt-32 bg-ink text-paper">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl mb-3">Skylimits Furniture</p>
          <p className="text-paper/60 max-w-xs text-sm leading-relaxed">
            Furniture designed for rooms with more air in them. Made in India,
            built to outlast the lease.
          </p>
        </div>
        <div>
          <p className="text-sm text-paper/50 mb-3">Shop</p>
          <ul className="space-y-2 text-sm text-paper/80">
            <li><a href="/products" className="hover:text-paper">All furniture</a></li>
            <li><a href="/products" className="hover:text-paper">Living room</a></li>
            <li><a href="/products" className="hover:text-paper">Bedroom</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-paper/50 mb-3">Support</p>
          <ul className="space-y-2 text-sm text-paper/80">
            <li><a href="#" className="hover:text-paper">Shipping & delivery</a></li>
            <li><a href="#" className="hover:text-paper">Returns</a></li>
            <li><a href="#" className="hover:text-paper">Care guide</a></li>
          </ul>
        </div>
      </div>
      <div className="rule border-paper/10 max-w-content mx-auto px-6 md:px-10 py-6 text-xs text-paper/40">
        © {new Date().getFullYear()} Skylimits Furniture. All rights reserved.
      </div>
    </footer>
  );
}