const mongoose = require('mongoose');
const Restaurant = require('./model/restaurant');
const restaurantData = require('./data/restaurants.json'); // Adjust path

mongoose.connect('mongodb://localhost:27017/restaurantdb');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  seedDB();
});

const seedDB = async () => {
  try {
    await Restaurant.deleteMany({});
    console.log('Old data deleted');

    const transformedRestaurants = restaurantData.map((restaurant) => ({
      _id: new mongoose.Types.ObjectId(restaurant._id.$oid),
      address: {
        building: restaurant.address?.building || 'N/A',
        street: restaurant.address?.street || 'N/A',
      },
      cuisine: restaurant.cuisine || 'Unknown',
      grades: restaurant.grades.map((grade) => ({
        date: new Date(grade.date.$date),
        grade: grade.grade || 'N/A',
        score: grade.score || 0,
      })),
      name: restaurant.name || 'Unnamed',
      restaurant_id: restaurant.restaurant_id || 'N/A',
    }));

    await Restaurant.insertMany(transformedRestaurants);
    console.log('Data seeded');
    process.exit(); // Exit after seeding
  } catch (err) {
    console.error('Error:', err);
  }
};