const express = require('express');
const router = express.Router();
const seedDatabase = require('../data/seed');

/**
 * @swagger
 * /api/seed:
 *   get:
 *     summary: Seed the database with dummy data
 *     tags: [Seed]
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: number
 *                     images:
 *                       type: number
 *       500:
 *         description: Error seeding database
 */
router.get('/seed', async (req, res) => {
  try {
    const result = await seedDatabase();
    res.json({
      message: 'Database seeded successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error seeding database',
      error: error.message
    });
  }
});

module.exports = router; 