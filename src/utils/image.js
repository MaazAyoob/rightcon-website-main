/**
 * Utility for optimizing Unsplash image requests on the fly.
 * Automatically replaces w=... and q=... parameters for responsive delivery,
 * significantly reducing bandwidth and rendering load on mobile viewports.
 */
export const optimizeUnsplashUrl = (url, width = 800, quality = 75) => {
  if (!url || typeof url !== 'string' || !url.includes('images.unsplash.com')) return url;
  try {
    let optimized = url;
    
    // Replace width parameter if present, otherwise append
    if (url.includes('w=')) {
      optimized = optimized.replace(/w=\d+/g, `w=${width}`);
    } else {
      optimized += optimized.includes('?') ? `&w=${width}` : `?w=${width}`;
    }
    
    // Replace quality parameter if present, otherwise append
    if (url.includes('q=')) {
      optimized = optimized.replace(/q=\d+/g, `q=${quality}`);
    } else {
      optimized += `&q=${quality}`;
    }
    
    // Ensure format=auto and fit=crop parameters are present
    if (!url.includes('auto=')) {
      optimized += `&auto=format`;
    }
    if (!url.includes('fit=')) {
      optimized += `&fit=crop`;
    }
    
    return optimized;
  } catch (e) {
    return url;
  }
};
