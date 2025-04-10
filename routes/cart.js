const express = require('express');
const router = express.Router();

// Mock cart storage
let mockCart = [];

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - image
 *             properties:
 *               product:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *               image:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *     responses:
 *       201:
 *         description: Item added to cart
 *       500:
 *         description: Server error
 */
router.post('/cart/add', (req, res) => {
  try {
    const { product, image } = req.body;
    
    const cartItem = {
      id: Date.now().toString(),
      product,
      image,
      quantity: 1
    };

    mockCart.push(cartItem);

    res.status(201).json({
      message: 'Item added to cart',
      cart: mockCart
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart contents
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   product:
 *                     type: object
 *                   image:
 *                     type: object
 *                   quantity:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/cart', (req, res) => {
  try {
    res.json(mockCart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

module.exports = router;