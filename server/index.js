const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const userRoutes = require('./routes/userRoutes');
// const APIRoutes = require('./routes/APIRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const parsonsProblemsRoutes = require('./routes/parsonsProblemsRoutes.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

require('dotenv').config();

const app = express();

// Middleware for reading json
app.use(express.json());
app.use(cors());

// Middleware for cookies
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/users', verifyJWT, userRoutes);
app.use('/api/parsonProblem', parsonsProblemsRoutes);
// app.use('/api/ai', APIRoutes);
app.use('/api/feedback', feedbackRoutes);


mongoose.connect(config.db.uri, config.db.options)
    .then(() => {
        console.log('Connected to ATLAS MongoDB');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }).catch(err => {
        console.error(`Database connection error: ${err}`);
    });