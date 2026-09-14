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

  const {
    width = 800,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    cloudName = DEFAULT_CLOUD_NAME,
  } = options;

  // Build transformation chain (e.g. "f_auto,q_auto,w_800,c_fill")
  const transformParts = [
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop && (width || height) ? `c_${crop}` : null,
  ].filter(Boolean);

  const transforms = transformParts.join(",");

  // 1. If it's already a Cloudinary upload URL (res.cloudinary.com/.../image/upload/...)
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    // If transforms already exist, replace or insert before version/public_id
    if (url.includes(`/image/upload/${transforms}/`)) {
      return url;
    }
    return url.replace("/image/upload/", `/image/upload/${transforms}/`);
  }

  // 2. If it's already a Cloudinary fetch URL (res.cloudinary.com/.../image/fetch/...)
  if (url.includes("res.cloudinary.com") && url.includes("/image/fetch/")) {
    return url.replace(/\/image\/fetch\/[^/]+\//, `/image/fetch/${transforms}/`);
  }

  // 3. For any external HTTP/HTTPS URL (e.g., Unsplash HD photos), route through Cloudinary Dynamic Fetch
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodeURI(url)}`;
  }

  // Local assets or fallback
  return url;
}

/**
 * Helper for Ultra-HD quality view (e.g., modal zoom, hero showcases, product detail)
 */
export function getCloudinaryHdMedia(url, width = 1400) {
  return getCloudinaryMedia(url, {
    width,
    quality: "auto:best",
    format: "auto",
    crop: "fill",
  });
}

/**
 * Generate a responsive srcSet string for Next.js or standard img tags
 */
export function getResponsiveSrcSet(url, widths = [400, 800, 1200, 1600]) {
  if (!url) return "";
  return widths
    .map((w) => `${getCloudinaryMedia(url, { width: w })} ${w}w`)
    .join(", ");
}

/**
 * Generates a Cloudinary direct download URL using dynamic attachment flags (fl_attachment)
 * 
 * @param {string} url - Source image URL
 * @param {string} [filename="skylimits-furniture"] - Suggested download filename
 * @returns {string} Download URL with fl_attachment
 */
export function getCloudinaryDownloadUrl(url, filename = "skylimits-furniture") {
  if (!url || typeof url !== "string") return "";

  const cleanFilename = encodeURIComponent(
    filename.replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase()
  );
  const attachmentTransform = `fl_attachment:${cleanFilename},q_auto:best,w_2000`;

  // 1. Existing Cloudinary upload URL
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    return url.replace("/image/upload/", `/image/upload/${attachmentTransform}/`);
  }

  // 2. Existing Cloudinary fetch URL
  if (url.includes("res.cloudinary.com") && url.includes("/image/fetch/")) {
    return url.replace(/\/image\/fetch\/[^/]+\//, `/image/fetch/${attachmentTransform}/`);
  }

  // 3. Any external HTTP/HTTPS URL: Route through dynamic fetch with fl_attachment
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/fetch/${attachmentTransform}/${encodeURI(url)}`;
  }

  return url;
}

/**
 * Triggers an instant local download for a high-res image
 * Uses Cloudinary fl_attachment and programmatically initiates browser file saving
 */
export async function downloadHighResImage(url, filename = "skylimits-furniture") {
  if (!url) return;

  const downloadUrl = getCloudinaryDownloadUrl(url, filename);

  try {
    // Attempt direct blob download for seamless browser save dialog
    const response = await fetch(downloadUrl, { mode: "cors" });
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
    console.warn("Direct blob download failed, falling back to anchor trigger:", err);
  }

  // Fallback direct anchor click with fl_attachment URL
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.download = `${filename}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

