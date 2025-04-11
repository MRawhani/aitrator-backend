const express = require('express');
const router = express.Router();

// Mock library data - just images without products
const mockLibrary = [
  {
    _id: '1',
    prompt: 'A beautiful sunset over mountains',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    _id: '2',
    prompt: 'Abstract geometric patterns',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    _id: '3',
    prompt: 'Cute puppy playing in grass',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  }
];

/**
 * @swagger
 * /api/library:
 *   get:
 *     summary: Get all pre-generated images
 *     tags: [Library]
 *     responses:
 *       200:
 *         description: List of pre-generated images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   prompt:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/all', (req, res) => {
  try {
    res.json(mockLibrary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching library images' });
  }
});

module.exports = router;