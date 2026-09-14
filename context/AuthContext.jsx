"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

const AuthContext = createContext(null);

const FREE_AI_QUERY_LIMIT = 10;
const SESSION_QUERY_KEY = "skylimits_ai_query_count";
const LOCAL_PROFILE_KEY = "skylimits_user_profile";
const LOCAL_SUBSCRIPTION_KEY = "skylimits_vip_subscribed";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [aiQueryCount, setAiQueryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Modal display states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 1. Initialize session query count from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = sessionStorage.getItem(SESSION_QUERY_KEY);
      if (storedCount) {
        setAiQueryCount(parseInt(storedCount, 10) || 0);
      }

      // Check local subscription persistence
      const storedSub = localStorage.getItem(LOCAL_SUBSCRIPTION_KEY);
      if (storedSub === "true") {
        setIsSubscribed(true);
      }
    }
  }, []);

  // 2. Initialize Supabase Auth session & listener
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured()) {
        // Mock / Offline dev fallback check
        const localProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
        if (localProfile) {
          try {
            const parsed = JSON.parse(localProfile);
            if (mounted) {
              setUser(parsed.user);
              setProfile(parsed.profile);
              setIsSubscribed(parsed.profile?.is_subscribed || false);
            }
          } catch (e) {
            console.error("Failed to parse local profile:", e);
          }
        }
        if (mounted) setIsLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          setUser(session.user);
          const meta = session.user.user_metadata || {};
          const isSub = Boolean(meta.is_subscribed || localStorage.getItem(LOCAL_SUBSCRIPTION_KEY) === "true");
          setIsSubscribed(isSub);
          setProfile({
            fullName: meta.full_name || session.user.email?.split("@")[0],
            phone: meta.phone || "",
            shippingAddress: meta.shipping_address || "",
            is_subscribed: isSub,
          });
        }
      } catch (err) {
        console.warn("Supabase auth session check notice:", err.message);
      } finally {
        if (mounted) setIsLoading(false);
      }

      // Auth change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (!mounted) return;
          if (session?.user) {
            setUser(session.user);
            const meta = session.user.user_metadata || {};
            const isSub = Boolean(meta.is_subscribed || localStorage.getItem(LOCAL_SUBSCRIPTION_KEY) === "true");
            setIsSubscribed(isSub);
            setProfile({
              fullName: meta.full_name || session.user.email?.split("@")[0],
              phone: meta.phone || "",
              shippingAddress: meta.shipping_address || "",
              is_subscribed: isSub,
            });
          } else {
            setUser(null);
            setProfile(null);
            setIsSubscribed(localStorage.getItem(LOCAL_SUBSCRIPTION_KEY) === "true");
          }
        }
      );

      return () => {
        subscription?.unsubscribe();
      };
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Increment AI query count per session
  const incrementAiQueryCount = useCallback(() => {
    setAiQueryCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_QUERY_KEY, next.toString());
      }
      return next;
    });
  }, []);

  // Modal openers
  const openAuthModal = useCallback((mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openPricingModal = useCallback(() => {
    setIsPricingModalOpen(true);
  }, []);

  const closePricingModal = useCallback(() => {
    setIsPricingModalOpen(false);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // Email/Password Sign Up with Name, Phone, Shipping Address
  const signUpWithEmail = async ({ email, password, fullName, phone, shippingAddress }) => {
    if (!isSupabaseConfigured()) {
      // Mock signup for local dev without active Supabase keys
      const mockUser = {
        id: `usr_${Date.now()}`,
        email,
        user_metadata: {
          full_name: fullName,
          phone,
          shipping_address: shippingAddress,
          is_subscribed: isSubscribed,
        },
      };
      const mockProfile = {
        fullName,
        phone,
        shippingAddress,
        is_subscribed: isSubscribed,
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        LOCAL_PROFILE_KEY,
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { user: mockUser }, error: null };
    }

    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          shipping_address: shippingAddress,
          is_subscribed: isSubscribed,
        },
      },
    });

    if (!res.error && res.data?.user) {
      setUser(res.data.user);
      setProfile({
        fullName,
        phone,
        shippingAddress,
        is_subscribed: isSubscribed,
      });
      closeAuthModal();
    }
    return res;
  };

  // Email/Password Sign In
  const signInWithEmail = async (email, password) => {
    if (!isSupabaseConfigured()) {
      const mockUser = {
        id: `usr_${Date.now()}`,
        email,
        user_metadata: {
          full_name: email.split("@")[0],
          phone: "+91 99594 27831",
          shipping_address: "Visakhapatnam, Andhra Pradesh, India",
          is_subscribed: isSubscribed,
        },
      };
      const mockProfile = {
        fullName: email.split("@")[0],
        phone: "+91 98765 43210",
        shippingAddress: "Visakhapatnam, Andhra Pradesh, India",
        is_subscribed: isSubscribed,
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        LOCAL_PROFILE_KEY,
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { user: mockUser }, error: null };
    }

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!res.error && res.data?.user) {
      setUser(res.data.user);
      const meta = res.data.user.user_metadata || {};
      setProfile({
        fullName: meta.full_name || res.data.user.email?.split("@")[0],
        phone: meta.phone || "",
        shippingAddress: meta.shipping_address || "",
        is_subscribed: Boolean(meta.is_subscribed || isSubscribed),
      });
      closeAuthModal();
    }
    return res;
  };

  // One-Click Social Sign In (Google, Facebook)
  const signInWithOAuth = async (provider) => {
    if (!isSupabaseConfigured()) {
      // Graceful local dev simulation
      const mockName = provider === "google" ? "Google User" : "Facebook User";
      const mockEmail = `${provider}.demo@skylimits.in`;
      const mockUser = {
        id: `usr_${provider}_${Date.now()}`,
        email: mockEmail,
        user_metadata: {
          full_name: mockName,
          provider,
          is_subscribed: isSubscribed,
        },
      };
      const mockProfile = {
        fullName: mockName,
        phone: "+91 98765 43210",
        shippingAddress: "New Delhi, India",
        is_subscribed: isSubscribed,
      };
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        LOCAL_PROFILE_KEY,
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      closeAuthModal();
      return { data: { provider }, error: null };
    }

    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined,
      },
    });
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_PROFILE_KEY);
  };

  // Mark user as VIP Pro Subscribed
  const markSubscribed = async (details = {}) => {
    setIsSubscribed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_SUBSCRIPTION_KEY, "true");
    }

    // Update profile state
    setProfile((prev) => ({
      ...(prev || {}),
      is_subscribed: true,
      subscription_tier: details.tier || "vip_pro",
      subscribed_at: new Date().toISOString(),
    }));

    // Update Supabase user metadata if available
    if (isSupabaseConfigured() && user) {
      try {
        await supabase.auth.updateUser({
          data: {
            is_subscribed: true,
            subscription_tier: details.tier || "vip_pro",
            subscribed_at: new Date().toISOString(),
            razorpay_payment_id: details.razorpay_payment_id || null,
          },
        });
      } catch (err) {
        console.warn("Could not update Supabase user metadata:", err);
      }
    }
  };

  const hasExceededAiLimit = !isSubscribed && aiQueryCount >= FREE_AI_QUERY_LIMIT;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isSubscribed,
        isLoading,
        aiQueryCount,
        aiQueryLimit: FREE_AI_QUERY_LIMIT,
        hasExceededAiLimit,
        incrementAiQueryCount,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isPricingModalOpen,
        openPricingModal,
        closePricingModal,
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
        signUpWithEmail,
        signInWithEmail,
        signInWithOAuth,
        signOut,
        markSubscribed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
