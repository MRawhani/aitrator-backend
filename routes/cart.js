const express = require('express');
const router = express.Router();

// Mock cart storage
let mockCart = [];

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
 *                   _id:
 *                     type: string
 *                   image:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       prompt:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                   product:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
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

/**
 * @swagger
 * /api/cart:
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
 *               - imageId
 *               - productId
 *             properties:
 *               imageId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 *       500:
 *         description: Server error
 */
router.post('/cart', async (req, res) => {
  try {
    const { image, productId, quantity = 1 } = req.body;
    // Fetch the image details

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Fetch the product details
    const productResponse = await fetch('http://localhost:5001/api/products/all');
    const products = await productResponse.json();
    const product = products.find(p => p._id === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const cartItem = {
      _id: Date.now().toString(),
      image,
      product,
      quantity
    };

    mockCart.push(cartItem);
    console.log(mockCart);
    res.status(201).json({
      message: 'Item added to cart',
      cart: mockCart 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.put('/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const itemIndex = mockCart.findIndex(item => item._id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    mockCart[itemIndex].quantity = quantity;
    res.json(mockCart[itemIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item' });
  }
});

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete('/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const itemIndex = mockCart.findIndex(item => item._id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    mockCart.splice(itemIndex, 1);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

module.exports = router;