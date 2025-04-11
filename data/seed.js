const mongoose = require('mongoose');
const Product = require('../models/Product');
const GeneratedImage = require('../models/GeneratedImage');

// Sample products
const products = [
  {
    name: 'Mug',
    price: 19.99,
    description: 'High-quality ceramic mug with your custom design',
    image: 'https://picsum.photos/200/200?random=1'
  },
  {
    name: 'T-Shirt',
    price: 29.99,
    description: 'Comfortable cotton t-shirt with your custom design',
    image: 'https://picsum.photos/200/200?random=2'
  },
  {
    name: 'Phone Case',
    price: 24.99,
    description: 'Durable phone case with your custom design',
    image: 'https://picsum.photos/200/200?random=3'
  }
];

// Sample prompts and images
const prompts = [
  'A beautiful sunset over mountains',
  'Abstract geometric patterns',
  'Cute cartoon animals',
  'Minimalist landscape',
  'Futuristic cityscape',
  'Vintage style illustration',
  'Watercolor flowers',
  'Digital art portrait'
];

// Generate random images with prompts
const generateImages = (products) => {
  const images = [];
  for (let i = 0; i < 20; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    images.push({
      prompt: randomPrompt,
      imageUrl: `https://picsum.photos/800/800?random=${i + 100}`,
      product: randomProduct._id,
      isPreGenerated: true
    });
  }
  return images;
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await GeneratedImage.deleteMany({});

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Generate and insert images
    const images = generateImages(insertedProducts);
    await GeneratedImage.insertMany(images);
    console.log('Pre-generated images seeded successfully');

    return {
      products: insertedProducts.length,
      images: images.length
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase; 