"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function PricingModal() {
  const {
    isPricingModalOpen,
    closePricingModal,
    isSubscribed,
    user,
    markSubscribed,
  } = useAuth();

  const [billingCycle, setBillingCycle] = useState("yearly"); // 'yearly' | 'monthly'
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isPricingModalOpen) return null;

  const currentPrice = billingCycle === "yearly" ? 499 : 99;
  const currentPeriod = billingCycle === "yearly" ? "year" : "month";

  // Dynamically load Razorpay checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setErrorMsg("");
    setStatusMsg("");

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: billingCycle,
          amount: currentPrice,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to initialize payment order");

      const orderData = await orderRes.json();

      // 2. If simulation order or Razorpay SDK unavailable, handle gracefully
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded || orderData.isSimulated) {
        // Complete mock/simulation verification
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.id,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            razorpay_signature: "simulated_signature",
            userId: user?.id,
            plan: billingCycle,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          markSubscribed({ tier: billingCycle, razorpay_payment_id: `pay_sim_${Date.now()}` });
          setStatusMsg("🎉 VIP Pro Activated! Enjoy unlimited styling & premium perks.");
          setTimeout(() => {
            closePricingModal();
          }, 1800);
          return;
        }
      }

      // 3. Launch live Razorpay modal
      const options = {
        key: orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Skylimits Furniture",
        description: `VIP Pro Tier (${billingCycle.toUpperCase()})`,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=200&q=80",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user?.id,
                plan: billingCycle,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              markSubscribed({
                tier: billingCycle,
                razorpay_payment_id: response.razorpay_payment_id,
              });
              setStatusMsg("🎉 Payment Verified! VIP Pro membership is now live.");
              setTimeout(() => {
                closePricingModal();
              }, 1800);
            } else {
              setErrorMsg(verifyData.message || "Payment signature verification failed");
            }
          } catch (err) {
            setErrorMsg("Payment verification error: " + err.message);
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || "Skylimits Member",
          email: user?.email || "customer@skylimits.in",
          contact: user?.user_metadata?.phone || "9959427831",
        },
        theme: {
          color: "#B3541E", // Timber theme accent
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (resp) {
        setErrorMsg(`Payment failed: ${resp.error.description}`);
        setLoading(false);
      });
      rzpInstance.open();
    } catch (err) {
      console.error("Subscription error:", err);
      setErrorMsg(err.message || "Unable to start Razorpay checkout.");
      setLoading(false);
    }
  };

  return (
    <div
      onClick={closePricingModal}
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-cloud max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-cloud">
          <div>
            <span className="text-xs font-semibold text-timber uppercase tracking-wider">
              Transparent Membership Tiers
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mt-1">
              Choose Your Skylimits Experience
            </h2>
            <p className="text-xs md:text-sm text-ink/60 mt-1">
              100% free core shopping with an optional VIP tier for interior styling enthusiasts.
            </p>
          </div>
          <button
            type="button"
            onClick={closePricingModal}
            className="text-ink/40 hover:text-ink text-xl font-light p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex justify-center my-6">
          <div className="bg-cloud/50 p-1 rounded-full flex items-center border border-cloud">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-paper text-ink shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Monthly (₹99/mo)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-timber text-paper shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              <span>Annual (₹499/yr)</span>
              <span className="bg-flame text-paper text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                Save 58%
              </span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold text-center">
            {statusMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Tiers Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* 1. Free Tier Card */}
          <div className="rounded-2xl border border-cloud p-5 flex flex-col justify-between bg-cloud/20">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink">Free Access</h3>
                <span className="text-[10px] font-semibold bg-cloud text-ink/70 px-2 py-0.5 rounded-full">
                  Included Default
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display text-3xl font-bold text-ink">₹0</span>
                <span className="text-xs text-ink/50 ml-1">/ forever</span>
              </div>
              <p className="text-xs text-ink/60 mt-2">
                Full core access to browse, inspect, and order handcrafted furniture.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-ink/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Browse 140+ pieces across all subcategories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Free High-Res Image Downloads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Complimentary Pan-India White-Glove Delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>10 Free AI Stylist queries per session</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-cloud">
              <span className="block text-center py-2.5 px-4 rounded-xl bg-cloud/80 text-ink/70 text-xs font-semibold">
                ✓ Free Tier Active
              </span>
            </div>
          </div>

          {/* 2. Paid VIP Pro Tier Card */}
          <div className="relative rounded-2xl border-2 border-amber-400 p-5 flex flex-col justify-between bg-gradient-to-b from-amber-50/50 to-paper shadow-md">
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-600 to-timber text-paper text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
              Recommended for Designers
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink flex items-center gap-1.5">
                  <span>VIP Pro</span>
                  <span>👑</span>
                </h3>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-amber-950">
                  ₹{currentPrice}
                </span>
                <span className="text-xs text-ink/60">/ {currentPeriod}</span>
              </div>
              <p className="text-xs text-ink/60 mt-2">
                Unlocks unlimited AI sessions, 3D AR models & member discounts.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-ink/90">
                <li className="flex items-start gap-2 font-medium">
                  <span className="text-amber-700 font-bold">★</span>
                  <span><strong>Unlimited</strong> AI interior styling & dimension sessions</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <span className="text-amber-700 font-bold">★</span>
                  <span><strong>Early Access</strong> to interactive 3D AR furniture models</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <span className="text-amber-700 font-bold">★</span>
                  <span><strong>Extra 15% VIP Discount</strong> stackable on all orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">★</span>
                  <span>Direct consultation with Visakhapatnam artisan team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">★</span>
                  <span>Free physical timber finish swatch box</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200">
              {isSubscribed ? (
                <div className="text-center py-2.5 px-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  ✓ VIP Pro Tier Subscribed
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-timber text-paper font-semibold text-xs shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Opening Razorpay...</span>
                  ) : (
                    <>
                      <span>Subscribe with Razorpay</span>
                      <span>(₹{currentPrice}) →</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-[11px] text-ink/50">
          Secured by Razorpay • Instant cancellation anytime • Razorpay Checkout API v1
        </div>
      </div>
    </div>
  );
}
