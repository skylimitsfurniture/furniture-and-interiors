"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { formatINR } from "@/data/furnitureData";
import { getCloudinaryMedia } from "@/utils/cloudinary";

export default function AIChatbot() {
  const {
    isChatOpen,
    closeChat,
    isSubscribed,
    aiQueryCount,
    aiQueryLimit,
    hasExceededAiLimit,
    incrementAiQueryCount,
    openPricingModal,
  } = useAuth();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Skylimits AI Interior Stylist. Ask me anything about our furniture dimensions, wood craftsmanship, room styling advice, or shipping policies.",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const queriesLeft = Math.max(0, aiQueryLimit - aiQueryCount);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  if (!isChatOpen) return null;

  const quickPrompts = [
    "What are the dimensions of Solis sofa?",
    "Suggest living room furniture pairing",
    "Solid timber beds under ₹40,000",
    "How does 7-day return work?",
  ];

  const handleSend = async (queryText) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    // Check freemium query limit
    if (hasExceededAiLimit) {
      openPricingModal();
      return;
    }

    const newMessages = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    incrementAiQueryCount();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "I am here to help you style your home.",
          products: data.products || [],
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I experienced a brief connection hiccup. Feel free to try again or reach out to our design artisans directly on WhatsApp!",
          products: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="AI Interior Stylist Chat"
      className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[82vh] bg-paper rounded-3xl shadow-2xl border border-cloud/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      {/* 1. Header */}
      <div className="bg-ink text-paper p-4 flex items-center justify-between border-b border-paper/10">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-timber flex items-center justify-center text-paper font-bold shadow">
            <span>✨</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-sm tracking-wide">
                Skylimits AI Stylist
              </h3>
              {isSubscribed ? (
                <span className="bg-amber-400 text-ink text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                  VIP PRO
                </span>
              ) : (
                <span className="bg-paper/20 text-paper text-[10px] px-2 py-0.5 rounded-full">
                  Free
                </span>
              )}
            </div>
            <p className="text-[11px] text-paper/60">
              {isSubscribed
                ? "Unlimited sessions • Interior Architect AI"
                : `${queriesLeft} of ${aiQueryLimit} free queries remaining`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={closeChat}
          className="w-8 h-8 rounded-full flex items-center justify-center text-paper/70 hover:text-paper hover:bg-paper/10 transition-colors"
          aria-label="Close Chat"
        >
          ✕
        </button>
      </div>

      {/* 2. Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-cloud/10 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm ${
                msg.role === "user"
                  ? "bg-timber text-paper rounded-br-none"
                  : "bg-paper text-ink border border-cloud rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>

            {/* Embedded Product Cards if assistant suggested items */}
            {msg.products && msg.products.length > 0 && (
              <div className="w-full mt-2 space-y-2 max-w-[90%]">
                {msg.products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    onClick={closeChat}
                    className="flex items-center gap-3 p-2 bg-paper rounded-xl border border-cloud/80 hover:border-timber hover:shadow-md transition-all group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getCloudinaryMedia(p.image, { width: 140, height: 140 })}
                      alt={p.title || p.name}
                      className="w-12 h-12 object-cover rounded-lg bg-cloud shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-ink text-xs truncate group-hover:text-timber">
                        {p.title || p.name}
                      </p>
                      <p className="text-[10px] text-ink/50 truncate">
                        {p.dimensions || p.subcategory}
                      </p>
                      <p className="text-[11px] font-bold text-ink mt-0.5">
                        {formatINR(p.price)}
                      </p>
                    </div>
                    <span className="text-[11px] text-timber font-medium px-2 py-1 rounded-full bg-timber/10 group-hover:bg-timber group-hover:text-paper transition-colors shrink-0">
                      View →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-paper rounded-2xl border border-cloud text-ink/50 w-fit">
            <span className="animate-pulse">Consulting styling catalog</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-timber animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-timber animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-timber animate-bounce [animation-delay:0.4s]" />
            </span>
          </div>
        )}

        {/* 3. Freemium Limit Exceeded Warning Card */}
        {hasExceededAiLimit && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 text-ink shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-display font-bold text-amber-900 text-sm">
              <span>👑</span>
              <span>Free Query Limit Reached (10/10)</span>
            </div>
            <p className="text-ink/80 text-[11px] leading-relaxed">
              You have completed all 10 complimentary styling questions for this session.
              Upgrade to <strong>Skylimits VIP Pro</strong> to unlock unlimited AI interior sessions, 3D AR furniture models, and an extra 15% discount.
            </p>
            <button
              type="button"
              onClick={openPricingModal}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-timber text-paper font-semibold text-xs shadow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Subscribe to VIP Pro (₹499/yr)</span>
              <span>→</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Quick Suggestions (when chat is short) */}
      {messages.length <= 2 && !hasExceededAiLimit && (
        <div className="px-4 py-2 bg-cloud/30 border-t border-cloud/50 flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] bg-paper px-2.5 py-1 rounded-full border border-cloud hover:border-timber hover:text-timber transition-colors text-ink/70"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* 5. Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-paper border-t border-cloud flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || hasExceededAiLimit}
          placeholder={
            hasExceededAiLimit
              ? "Subscribe to VIP Pro to continue chatting..."
              : "Ask about furniture, dimensions, styling..."
          }
          className="flex-1 bg-cloud/40 border border-cloud rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-timber disabled:opacity-60 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading || hasExceededAiLimit}
          className="px-4 py-2.5 rounded-xl bg-timber text-paper font-semibold text-xs disabled:opacity-40 hover:bg-timberdark transition-colors shadow-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
