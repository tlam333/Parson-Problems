const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config/config.js');

// Routers
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const testRoutes = require('./routes/testRoutes.js');
const parsonsProblemsRoutes = require('./routes/parsonsProblemsRoutes.js');


// Middleware
const requestHandler = require('./middleware/requestHandler.js');

const app = express();

// Middleware for reading json
app.use(express.json());
app.use(cors());

// Middleware for cookies
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use(requestHandler);
app.use('/api/test', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/parsonProblem', parsonsProblemsRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(config.db.uri, config.db.options)
    .then(() => {
        console.log('Connected to ATLAS MongoDB');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }).catch((err) => {
        console.error(`Database connection error: ${err}`);
    });