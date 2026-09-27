"use client";

import { useState } from "react";
import Link from "next/link";
import { getCloudinaryMedia, downloadHighResImage } from "@/utils/cloudinary";
import { formatINR } from "@/data/furnitureData";

export default function ProductCard({ product, onQuickView }) {
  const [imgSrc, setImgSrc] = useState(
    getCloudinaryMedia(product.image, { width: 800 })
  );
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Fallback gracefully to direct image URL if Cloudinary fetch has network constraints
  const handleImageError = () => {
    if (!hasFailedOnce && product.image) {
      setHasFailedOnce(true);
      setImgSrc(product.image);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (downloading) return;
    setDownloading(true);
    await downloadHighResImage(product.image, `${product.title}-highres`);
    setDownloading(false);
  };

  return (
    <div className="group relative flex flex-col bg-paper rounded-2xl overflow-hidden border border-cloud/70 hover:border-timber/40 transition-all duration-300 hover:shadow-lg">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-cloud/40 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={product.title}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subcategory & Regional Delivery Pills */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-paper/90 backdrop-blur-md text-ink text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm w-fit">
            {product.subcategory}
          </span>
          <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wide flex items-center gap-1 w-fit">
            <span>⚡</span> Vizag Express
          </span>
          <span className="bg-ink/80 text-white text-[9px] font-medium px-2 py-0.5 rounded-full shadow-xs tracking-tight w-fit">
            AP & Telangana
          </span>
        </div>

        {/* 1-Click High-Res Download Button (Top Right) */}
        <button
          type="button"
          onClick={handleDownload}
          title="Download High-Res Image"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-paper/90 backdrop-blur-md text-ink/70 hover:text-timber hover:bg-paper shadow-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Download High-Res Image"
        >
          {downloading ? (
            <svg className="w-3.5 h-3.5 animate-spin text-timber" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
        </button>

        {/* Quick View & Download Hover Overlay */}
        <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="px-3.5 py-1.5 bg-paper/95 text-ink text-xs font-semibold rounded-full shadow-md hover:bg-timber hover:text-paper transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            Quick HD View
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 bg-paper/95 text-ink text-xs font-semibold rounded-full shadow-md hover:bg-ink hover:text-paper transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1"
          >
            <span>↓</span>
            <span>HD Download</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-ink/50 mb-1">
            <span>{product.section || product.category}</span>
            {product.rating && (
              <span className="flex items-center gap-1 font-medium text-amber-700">
                ★ {product.rating}
              </span>
            )}
          </div>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-display text-base text-ink font-semibold line-clamp-1 hover:text-timber transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-ink/60 line-clamp-1 mt-1">
            {product.material || product.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-cloud/50 flex items-center justify-between">
          <p className="font-semibold text-ink text-sm">
            {formatINR(product.price)}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="text-xs font-medium text-timber hover:text-timberdark underline underline-offset-4"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
