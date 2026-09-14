"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCloudinaryHdMedia, downloadHighResImage } from "@/utils/cloudinary";
import { formatINR } from "@/data/furnitureData";

export default function QuickViewModal({ product, onClose }) {
  const [imgSrc, setImgSrc] = useState("");
  const [hasFailed, setHasFailed] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (product?.image) {
      setImgSrc(getCloudinaryHdMedia(product.image, 1400));
      setHasFailed(false);
    }
  }, [product]);

  const handleDownload = async () => {
    if (!product?.image || downloading) return;
    setDownloading(true);
    await downloadHighResImage(product.image, `${product.title}-1400px-hd`);
    setDownloading(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper rounded-3xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 shadow-2xl border border-cloud max-h-[90vh] overflow-y-auto"
      >
        {/* HD Image Section */}
        <div className="relative aspect-square md:aspect-auto bg-cloud/50 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc || product.image}
            alt={product.title}
            onError={() => {
              if (!hasFailed) {
                setHasFailed(true);
                setImgSrc(product.image);
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-ink shadow-sm">
            HD Clarity • 1400px
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="absolute bottom-4 left-4 bg-paper/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink shadow hover:bg-timber hover:text-paper transition-all flex items-center gap-1.5"
          >
            <span>↓</span>
            <span>{downloading ? "Downloading..." : "Download High-Res"}</span>
          </button>
        </div>

        {/* Product Details Section */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-timber">
                {product.category} • {product.subcategory}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-ink/40 hover:text-ink text-2xl font-light leading-none p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mt-2">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 mt-3">
              <p className="font-display text-2xl text-ink font-bold">
                {formatINR(product.price)}
              </p>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                In Stock • Pan-India Free Delivery
              </span>
            </div>

            <p className="text-ink/70 text-sm mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 pt-4 border-t border-cloud space-y-2 text-xs text-ink/80">
              <div className="flex justify-between">
                <span className="text-ink/50">Materials:</span>
                <span className="font-medium text-ink">{product.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Dimensions:</span>
                <span className="font-medium text-ink">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Finish / Tone:</span>
                <span className="font-medium capitalize text-ink">{product.tone}</span>
              </div>
              {product.rating && (
                <div className="flex justify-between">
                  <span className="text-ink/50">Customer Rating:</span>
                  <span className="font-medium text-amber-700">
                    ★ {product.rating} / 5 ({product.reviewsCount} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-cloud flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="flex-1 min-w-[140px] text-center px-5 py-3 rounded-full bg-timber text-paper text-sm font-semibold hover:bg-timberdark transition-colors shadow-sm"
            >
              Full Details →
            </Link>
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-3 rounded-full border border-timber text-timber text-sm font-semibold hover:bg-timber hover:text-paper transition-colors flex items-center gap-1.5"
            >
              <span>↓</span>
              <span>HD (1400px)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-full border border-ink/20 text-ink text-sm font-medium hover:bg-cloud/50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

