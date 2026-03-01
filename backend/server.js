// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Validate MONGO_URI early so deploy fails clearly if missing
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set. Exiting.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Exit so Render shows deploy failure and you can check logs
    process.exit(1);
  });

// Helpful test endpoints (no changes to your existing routes)
app.get('/', (req, res) => {
  res.send('Backend is live and working ✅');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working and connected to backend ✅' });
});

// Health endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Your existing routes (unchanged)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/stats', require('./routes/stats'));  // if you have this route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Catch unhandled errors so they show in logs
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
