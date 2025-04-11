const express = require('express');
const router = express.Router();

// Mock products data
const mockProducts = [
  {
    _id: '1',
    name: 'Coffee Mug',
    price: 19.99,
    previewImage: 'https://picsum.photos/200/200?random=1'
  },
  {
    _id: '2',
    name: 'T-Shirt',
    price: 29.99,
    previewImage: 'https://picsum.photos/200/200?random=2'
  },
  {
    _id: '3',
    name: 'Phone Case',
    price: 24.99,
    previewImage: 'https://picsum.photos/200/200?random=3'
  }
];

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   previewImage:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/all', (req, res) => {
  try {
    res.json(mockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  console.log(product);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;