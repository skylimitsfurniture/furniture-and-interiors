import Link from "next/link";
import { notFound } from "next/navigation";
import {
  furnitureData,
  formatINR,
  getFurnitureById,
} from "@/data/furnitureData";
import { getCloudinaryHdMedia, getCloudinaryDownloadUrl } from "@/utils/cloudinary";
import CatalogBreadcrumbs from "@/components/CatalogBreadcrumbs";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return furnitureData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product =
    getFurnitureById(id) ||
    furnitureData.find((p) => p.id.startsWith(id) || id.startsWith(p.id));

  if (!product) {
    return { title: "Product Not Found | Skylimits" };
  }

  return {
    title: `${product.title} | Skylimits Furniture`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Support both new IDs and legacy ID aliases (e.g. sofa-arden -> sofa-arden-3s)
  const product =
    getFurnitureById(id) ||
    furnitureData.find((p) => p.id.startsWith(id) || id.startsWith(p.id));

  if (!product) {
    notFound();
  }

  const hdImageUrl = getCloudinaryHdMedia(product.image, 1600);
  const downloadUrl = getCloudinaryDownloadUrl(
    product.image,
    `${product.title}-1600px-ultrahd`
  );

  // Related products from the same subcategory
  const related = furnitureData
    .filter(
      (p) =>
        p.subcategory === product.subcategory && p.id !== product.id
    )
    .slice(0, 3);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/products" },
    {
      label: product.category,
      href: `/products?category=${encodeURIComponent(product.category)}`,
    },
    {
      label: product.subcategory,
      href: `/products?category=${encodeURIComponent(
        product.category
      )}&subcategory=${encodeURIComponent(product.subcategory)}`,
    },
    { label: product.title, isActive: true },
  ];

  return (
    <main className="max-w-content mx-auto px-4 md:px-10 py-8 min-h-screen">
      {/* Breadcrumb Trail */}
      <div className="mb-6">
        <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Product Showcase */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: HD Image Display */}
        <div className="relative aspect-[4/3] md:aspect-square bg-cloud/50 rounded-3xl overflow-hidden shadow-lg border border-cloud">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hdImageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-paper/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink shadow">
            Ultra-HD Studio Photography (1600px)
          </div>

          <a
            href={downloadUrl}
            download={`${product.title}-ultrahd.jpg`}
            className="absolute bottom-4 right-4 bg-paper/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink shadow hover:bg-timber hover:text-paper transition-all flex items-center gap-1.5"
            title="Instant High-Res Download (Cloudinary Dynamic Attachment)"
          >
            <span>↓</span>
            <span>Download Ultra-HD</span>
          </a>

          <div className="absolute top-4 right-4 bg-flame text-paper text-xs font-semibold px-3 py-1 rounded-full shadow">
            Handcrafted
          </div>
        </div>

        {/* Right: Product Details & Specs */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-timber uppercase tracking-wider">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.section}</span>
              <span>•</span>
              <span>{product.subcategory}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-ink font-bold mt-2 leading-tight">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="text-amber-700 font-bold">★ {product.rating}</span>
                <span className="text-ink/40">|</span>
                <span className="text-ink/60">
                  {product.reviewsCount} customer reviews
                </span>
              </div>
            )}

            <div className="mt-5 pb-6 border-b border-cloud flex items-baseline gap-4">
              <span className="font-display text-3xl md:text-4xl text-ink font-bold">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-ink/50 line-through">
                {formatINR(Math.round(product.price * 1.25))}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                Save 20%
              </span>
            </div>

            <p className="mt-6 text-ink/75 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Specifications Card */}
            <div className="mt-8 p-5 bg-cloud/40 rounded-2xl border border-cloud space-y-3 text-xs md:text-sm">
              <h3 className="font-display font-bold text-ink text-sm uppercase tracking-wide">
                Craftsmanship & Dimensions
              </h3>
              <div className="flex justify-between py-1 border-b border-cloud/60">
                <span className="text-ink/60">Materials:</span>
                <span className="font-medium text-ink">{product.material}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cloud/60">
                <span className="text-ink/60">Dimensions:</span>
                <span className="font-medium text-ink">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cloud/60">
                <span className="text-ink/60">Wood Tone:</span>
                <span className="font-medium capitalize text-ink">
                  {product.tone}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-ink/60">Assembly:</span>
                <span className="font-medium text-ink">
                  Expert Pan-India Installation Included
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 py-4 px-8 rounded-full bg-timber text-paper font-semibold text-sm hover:bg-timberdark transition-colors shadow-md text-center cursor-pointer"
              >
                Add to Cart • {formatINR(product.price)}
              </button>
              <a
                href={downloadUrl}
                download={`${product.title}-ultrahd.jpg`}
                className="py-4 px-6 rounded-full border border-timber text-timber font-semibold text-sm hover:bg-timber hover:text-paper transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <span>↓</span>
                <span>Download Ultra-HD (1600px)</span>
              </a>
              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category
                )}&subcategory=${encodeURIComponent(product.subcategory)}`}
                className="py-4 px-6 rounded-full border border-ink/20 text-ink font-semibold text-sm hover:bg-cloud/50 transition-colors text-center"
              >
                More {product.subcategory} →
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-ink/70">
              <div className="p-3 bg-paper rounded-xl border border-cloud">
                <p className="font-semibold text-ink">Solid Hardwood</p>
                <p className="text-[11px] text-ink/50 mt-0.5">No Flat-Packs</p>
              </div>
              <div className="p-3 bg-paper rounded-xl border border-cloud">
                <p className="font-semibold text-ink">Free Delivery</p>
                <p className="text-[11px] text-ink/50 mt-0.5">Pan-India Transit</p>
              </div>
              <div className="p-3 bg-paper rounded-xl border border-cloud">
                <p className="font-semibold text-ink">7-Day Returns</p>
                <p className="text-[11px] text-ink/50 mt-0.5">Hassle-Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products from same subcategory */}
      {related.length > 0 && (
        <section className="mt-20 pt-12 border-t border-cloud">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-timber uppercase tracking-wider">
                Explore More
              </p>
              <h2 className="font-display text-2xl text-ink font-bold mt-1">
                More in {product.subcategory}
              </h2>
            </div>
            <Link
              href={`/products?category=${encodeURIComponent(
                product.category
              )}&subcategory=${encodeURIComponent(product.subcategory)}`}
              className="text-xs font-semibold text-timber hover:underline underline-offset-4"
            >
              View all 10 items →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
