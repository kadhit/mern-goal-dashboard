const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Please set to production');
    });
}

// Error Handling
app.use(errorHandler);

// Establishing Connection
app.listen(port, () => console.log(`Server running on port ${port}`));