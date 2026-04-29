const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Route middlewares
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/diet', require('./src/routes/diet'));
app.use('/api/workout', require('./src/routes/workout'));
app.use('/api/health', require('./src/routes/healthData')); // Updated to point to new healthData
app.use('/api/bmi', require('./src/routes/bmi')); // Keep bmi routes separately just in case
app.use('/api/requests', require('./src/routes/requests'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/community', require('./src/routes/community'));
app.use('/api/blog', require('./src/routes/community')); // mapped blog routes as requested
app.use('/api/exercises', require('./src/routes/exercises'));
app.use('/api/plans', require('./src/routes/workoutPlans'));
app.use('/api/sessions', require('./src/routes/sessions'));
app.use('/api/calculator', require('./src/routes/calculator'));
// Basic Route
app.get('/', (req, res) => {
  res.send('SAMANVAYA Health Connect API');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
