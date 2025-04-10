const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Process checkout
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     product:
 *                       type: object
 *                     image:
 *                       type: object
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Checkout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 orderId:
 *                   type: string
 *       400:
 *         description: Checkout failed
 *       500:
 *         description: Server error
 */
router.post('/checkout', (req, res) => {
  try {
    const { cart } = req.body;

    // Randomly decide if checkout succeeds (80% success rate)
    const success = Math.random() < 0.8;

    if (success) {
      res.json({
        success: true,
        message: 'Checkout successful',
        orderId: Date.now().toString()
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Checkout failed - please try again'
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

module.exports = router;