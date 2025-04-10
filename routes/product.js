const express = require('express');
const router = express.Router();

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Coffee Mug',
    price: 19.99,
    previewImage: 'https://example.com/mug-preview.jpg'
  },
  {
    id: '2',
    name: 'T-Shirt',
    price: 29.99,
    previewImage: 'https://example.com/tshirt-preview.jpg'
  },
  {
    id: '3',
    name: 'Phone Case',
    price: 24.99,
    previewImage: 'https://example.com/case-preview.jpg'
  }
];

/**
 * @swagger
 * /api/products:
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
router.get('/products', (req, res) => {
  try {
    res.json(mockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;