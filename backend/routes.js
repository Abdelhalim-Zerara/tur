const express = require('express');
const app = express();

// Import your routes
const appointmentRoutes = require('./routes/appointements');
const userRoutes = require('./routes/users');


// Use your routes

app.use('/api/appointements',appointmentRoutes);

app.use('/api/users',userRoutes);