const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        url: 'https://voicera-54e2ed3d14f5.herokuapp.com/',
      },
    ],
  },
  apis: ['./src/app.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };