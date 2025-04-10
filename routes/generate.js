const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/images/generate:
 *   post:
 *     summary: Generate new images based on prompt and product
 *     tags: [Generate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - prompt
 *             properties:
 *               product:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of generated images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   prompt:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   product:
 *                     type: object
 *       500:
 *         description: Server error
 */
router.post('/images/generate', async (req, res) => {
  try {
    const { product, prompt } = req.body;

    // Mock OpenAI response delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate 3 random mock images
    const mockImages = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now().toString() + i,
      prompt,
      imageUrl: `https://example.com/generated-${Date.now()}-${i}.jpg`,
      product
    }));

    res.json(mockImages);
  } catch (error) {
    res.status(500).json({ message: 'Error generating images' });
  }
});

module.exports = router;