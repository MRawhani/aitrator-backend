require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    deepLinking: true
  }
}));

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const libraryRoutes = require('./routes/library');
const generateRoutes = require('./routes/generate');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', libraryRoutes);
app.use('/api', generateRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 