const express = require('express');
const router = express.Router();

// Mock library data
const mockLibrary = [
  {
    id: '1',
    prompt: 'A beautiful sunset over mountains',
    imageUrl: 'https://example.com/sunset-image.jpg',
    product: {
      id: '1',
      name: 'Coffee Mug',
      price: 19.99
    }
  },
  {
    id: '2',
    prompt: 'Abstract geometric patterns',
    imageUrl: 'https://example.com/abstract-image.jpg',
    product: {
      id: '2',
      name: 'T-Shirt',
      price: 29.99
    }
  },
  {
    id: '3',
    prompt: 'Cute puppy playing in grass',
    imageUrl: 'https://example.com/puppy-image.jpg',
    product: {
      id: '3',
      name: 'Phone Case',
      price: 24.99
    }
  }
];

/**
 * @swagger
 * /api/images/library:
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
 *                   id:
 *                     type: string
 *                   prompt:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   product:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *       500:
 *         description: Server error
 */
router.get('/images/library', (req, res) => {
  try {
    res.json(mockLibrary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching library images' });
  }
});

module.exports = router;