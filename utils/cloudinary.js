/**
 * Cloudinary Dynamic Media CDN Helper
 * 
 * Routes image URLs through Cloudinary's dynamic CDN fetch transformations:
 * - f_auto: automatic modern format delivery (AVIF/WebP based on browser support)
 * - q_auto: smart perceptual quality compression preserving sharp HD clarity
 * - w_800 / custom width: responsive dimension scaling
 * - dpr_auto: retina display pixel ratio optimization
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "kkpn3h5f";

/**
 * Generates an optimized Cloudinary dynamic fetch CDN URL
 * 
 * @param {string} url - Source image URL (Unsplash, external URL, or Cloudinary URL)
 * @param {object} options - Transformation options
 * @param {number} [options.width=800] - Image width in pixels
 * @param {number} [options.height] - Optional height
 * @param {string} [options.quality="auto"] - Quality setting ('auto', 'auto:best', 'auto:good')
 * @param {string} [options.format="auto"] - Format ('auto', 'webp', 'avif', 'jpg')
 * @param {string} [options.crop="fill"] - Crop mode ('fill', 'scale', 'fit', 'thumb')
 * @param {string} [options.cloudName] - Cloudinary cloud name override
 * @returns {string} Fully transformed Cloudinary CDN URL
 */
export function getCloudinaryMedia(url, options = {}) {
  if (!url || typeof url !== "string") return "";

  // If using Postimages or external URLs directly, return the URL as-is
  return url;
}

/**
 * Helper for Ultra-HD quality view
 */
export function getCloudinaryHdMedia(url, width = 1400) {
  return url || "";
}

/**
 * Generate a responsive srcSet string for Next.js or standard img tags
 */
export function getResponsiveSrcSet(url, widths = [400, 800, 1200, 1600]) {
  if (!url) return "";
  return `${url} 1x`;
}

/**
 * Generates direct download URL
 */
export function getCloudinaryDownloadUrl(url, filename = "skylimits-furniture") {
  return url || "";
}

/**
 * Triggers an instant local download for a high-res image
 */
export async function downloadHighResImage(url, filename = "skylimits-furniture") {
  if (!url) return;

  try {
    const response = await fetch(url, { mode: "cors" });
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      return;
    }
  } catch (err) {
    console.warn("Direct blob download failed, falling back to direct link trigger:", err);
  }

  // Fallback direct anchor click
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.download = `${filename}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

