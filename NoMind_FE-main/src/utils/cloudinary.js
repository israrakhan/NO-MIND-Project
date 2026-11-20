import cloudinaryUrls from '../config/cloudinaryUrls.json';

/**
 * Returns the Cloudinary URL for a given local public asset filename.
 * If not found in the mapping, it falls back to the local relative path.
 * 
 * @param {string} filename The name of the file (e.g. 'logo.png', 'video.mp4')
 * @returns {string} The public URL of the asset
 */
export const getMediaUrl = (filename) => {
  // Strip leading slash if present
  const key = filename.startsWith('/') ? filename.substring(1) : filename;
  return cloudinaryUrls[key] || `/${key}`;
};
