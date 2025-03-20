require("dotenv").config();
const express = require('express');
const connect = require('../db/db.js');
const Restaurant = require('../model/restaurant.js');
const { swaggerUi, specs } = require('../swagger.js'); // Import

const cors = require('cors');
const app = express();
connect.connectDB();
const port = process.env.PORT || "";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Route
app.use(cors());
app.use(express.json());


/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get list of restaurants with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page (default 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term (name of restaurant)
 *     responses:
 *       200:
 *         description: A paginated list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRecords:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 recordsPerPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       cuisine:
 *                         type: string
 */

app.get('/restaurants', async (req, res) => {
    try {
        // Get query params
        let { page, limit, search } = req.query;

        // Default values if not provided
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        search = search || '';

  
      const query = {
        name: { $regex: search, $options: 'i' }, // Optional name filter
      };
  
      const restaurants = await Restaurant.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Restaurant.countDocuments(query);
  
      res.json({
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        data: restaurants,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});