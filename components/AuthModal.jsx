"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    signInWithEmail,
    signUpWithEmail,
    signInWithOAuth,
  } = useAuth();

  const [mode, setMode] = useState(authModalMode || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Sync mode if changed from context
  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        const res = await signInWithEmail(email, password);
        if (res?.error) {
          setErrorMsg(res.error.message || "Failed to sign in. Please verify your credentials.");
        } else {
          setSuccessMsg("Welcome back!");
        }
      } else {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your full name.");
          setSubmitting(false);
          return;
        }
        const res = await signUpWithEmail({
          email,
          password,
          fullName,
          phone,
          shippingAddress,
        });
        if (res?.error) {
          setErrorMsg(res.error.message || "Sign-up failed. Please check your inputs.");
        } else {
          setSuccessMsg("Account created successfully! Welcome to Skylimits.");
        }
      }
    } catch (err) {
      setErrorMsg(err.message || "An unexpected authentication error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuth = async (provider) => {
    setErrorMsg("");
    setSubmitting(true);
    try {
      const res = await signInWithOAuth(provider);
      if (res?.error) {
        setErrorMsg(res.error.message);
      }
    } catch (err) {
      setErrorMsg(err.message || `Failed to sign in with ${provider}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-cloud max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cloud">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              {mode === "login" ? "Sign In to Skylimits" : "Create Free Account"}
            </h2>
            <p className="text-xs text-ink/60 mt-0.5">
              100% free catalog access, high-res downloads & AI styling
            </p>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-ink/40 hover:text-ink text-xl font-light p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-cloud mt-4">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              mode === "login"
                ? "border-timber text-timber"
                : "border-transparent text-ink/50 hover:text-ink"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              mode === "signup"
                ? "border-timber text-timber"
                : "border-transparent text-ink/50 hover:text-ink"
            }`}
          >
            New Account
          </button>
        </div>

        {/* Feedback messages */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            {successMsg}
          </div>
        )}

        {/* One-Click Social Sign-In */}
        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-cloud hover:border-ink/40 bg-paper text-ink font-semibold text-xs transition-all shadow-sm hover:bg-cloud/20"
          >
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("facebook")}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-cloud hover:border-ink/40 bg-paper text-ink font-semibold text-xs transition-all shadow-sm hover:bg-cloud/20"
          >
            {/* Facebook Icon */}
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full border-t border-cloud" />
          <span className="bg-paper px-3 text-[11px] text-ink/40 uppercase tracking-wider absolute">
            or with email
          </span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cloud/30 border border-cloud text-xs text-ink focus:outline-none focus:border-timber"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cloud/30 border border-cloud text-xs text-ink focus:outline-none focus:border-timber"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  Shipping Delivery Address
                </label>
                <textarea
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, City, State, Pincode"
                  className="w-full px-3.5 py-2 rounded-xl bg-cloud/30 border border-cloud text-xs text-ink focus:outline-none focus:border-timber resize-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-cloud/30 border border-cloud text-xs text-ink focus:outline-none focus:border-timber"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-cloud/30 border border-cloud text-xs text-ink focus:outline-none focus:border-timber"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 rounded-xl bg-timber text-paper font-semibold text-xs hover:bg-timberdark transition-colors shadow-sm disabled:opacity-50"
          >
            {submitting
              ? "Processing..."
              : mode === "login"
              ? "Sign In"
              : "Create Free Account"}
          </button>
        </form>

        <div className="mt-5 text-center text-[11px] text-ink/50">
          By continuing, you agree to Skylimits Furniture's free service terms.
          Singapore Region: <span className="font-mono text-[10px]">ap-southeast-1</span>
        </div>
      </div>
    </div>
  );
}
