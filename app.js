require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { router: authRouter, mockAuthMiddleware } = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

// Auth routes (no auth middleware)
app.use('/api/auth', authRouter);

// Protected routes (with auth middleware)
const productRouter = require('./routes/product');
const libraryRouter = require('./routes/library');
const generateRouter = require('./routes/generate');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');
const seedRouter = require('./routes/seed');

// Apply auth middleware to protected routes
app.use('/api/products', mockAuthMiddleware, productRouter);
app.use('/api/library', mockAuthMiddleware, libraryRouter);
app.use('/api', mockAuthMiddleware, generateRouter);
app.use('/api', mockAuthMiddleware, cartRouter);
app.use('/api', mockAuthMiddleware, checkoutRouter);
app.use('/api', seedRouter);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 