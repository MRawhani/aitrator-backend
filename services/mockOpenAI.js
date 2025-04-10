/**
 * Mock OpenAI service that engineers prompts for image generation
 * @param {Object} product - The product to generate image for
 * @param {string} prompt - User's input prompt
 * @returns {string} Engineered prompt
 */
const engineerPrompt = (product, prompt) => {
  // Add product-specific context to the prompt
  const productContext = {
    'Coffee Mug': 'A beautiful, high-quality image suitable for printing on a ceramic mug. The design should be centered and wrap around the mug naturally.',
    'T-Shirt': 'A striking, high-resolution design that works well on a t-shirt. The image should be suitable for both front and back printing.',
    'Phone Case': 'A detailed, vibrant design that fits perfectly on a phone case. The image should be optimized for the case\'s dimensions and shape.'
  };

  // Get the product-specific context
  const context = productContext[product.name] || 'A high-quality, print-ready design';

  // Combine the context with the user's prompt
  return `${context}. The design should be: ${prompt}. Make sure it's suitable for printing and has high resolution.`;
};

module.exports = {
  engineerPrompt
}; 