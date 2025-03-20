const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoURL = process.env.MONGO_URL || ""
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurants API',
      version: '1.0.0',
      description: 'API for searching restaurants with pagination',
    },
    servers: [
      {
        url: mongoURL,
      },
    ],
  },
  apis: ['./src/index.js'], // Path to the API docs (can be multiple files)
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };