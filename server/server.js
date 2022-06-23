const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));