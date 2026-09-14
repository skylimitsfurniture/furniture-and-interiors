"use client";

import { useState } from "react";
import ProductArt from "@/components/ProductArt";
import { formatINR } from "@/lib/products";

export default function ProductGrid({ products }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group">
            <button
              onClick={() => setSelected(p)}
              className="w-full rounded-2xl overflow-hidden bg-cloud aspect-square block"
            >
              {/* Swap ProductArt for a real <img src={p.image}> once photos are ready */}
              <ProductArt
                tone={p.tone}
                className="w-full h-full group-hover:scale-[1.04] transition-transform duration-300"
              />
            </button>
            <a href={`/products/${p.id}`} className="block mt-3">
              <p className="text-ink text-sm">{p.name}</p>
              <p className="text-ink/60 text-xs mt-1">{formatINR(p.price)}</p>
            </a>
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-paper rounded-2xl overflow-hidden max-w-lg w-full"
          >
            <div className="aspect-square bg-cloud">
              <ProductArt tone={selected.tone} className="w-full h-full" />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="font-display text-xl text-ink">{selected.name}</p>
                <p className="text-ink/60 text-sm mt-1">{formatINR(selected.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/products/${selected.id}`}
                  className="px-4 py-2 rounded-full bg-ink text-paper text-sm hover:bg-timberdark transition-colors"
                >
                  View details
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="text-ink/50 hover:text-ink text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
