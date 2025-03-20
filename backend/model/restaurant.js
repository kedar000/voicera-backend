const mongoose = require('mongoose');

// Define grade schema
const gradeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

// Define address schema
const addressSchema = new mongoose.Schema({
  building: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

// Define restaurant schema
const restaurantSchema = new mongoose.Schema({
  address: {
    type: addressSchema,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
    index : true  // indexing
  },
  grades: {
    type: [gradeSchema],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
  },
});

// Export model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;