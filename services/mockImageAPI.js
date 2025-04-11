/**
 * Mock Image API service that generates random image URLs
 * @param {string} prompt - The engineered prompt
 * @returns {Promise<Array<string>>} Array of 3 image URLs
 */
const generateImages = async (prompt) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate 3 random image URLs
  const timestamp = Date.now();
  return [
    `https://picsum.photos/800/600?random=${timestamp}-1`,
    `https://picsum.photos/800/600?random=${timestamp}-2`,
    `https://picsum.photos/800/600?random=${timestamp}-3`
  ];
};

/**
 * Get a random image style for variety
 * @returns {string} Random image style
 */
const getRandomStyle = () => {
  const styles = [
    'digital art',
    'watercolor',
    'oil painting',
    'minimalist',
    'abstract',
    'realistic',
    'cartoon',
    'anime',
    'pixel art',
    '3D render'
  ];
  return styles[Math.floor(Math.random() * styles.length)];
};

module.exports = {
  generateImages,
  getRandomStyle
}; 