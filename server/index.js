const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();

// Middleware for reading json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/refresh', refreshRoutes);

app.use('/api/users', verifyJWT, userRoutes);


mongoose.connect(config.db.uri, config.db.options)
    .then(() => {
        console.log('Connected to ATLAS MongoDB');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }).catch(err => {
        console.error(`Database connection error: ${err}`);
    });