const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aitrator API',
      version: '1.0.0',
      description: 'API documentation for Aitrator - AI x eCommerce Web App',
      contact: {
        name: 'API Support',
        email: 'support@aitrator.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User\'s full name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User\'s password'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User\'s role'
            }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 