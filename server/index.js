const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use('/api/users', userRoutes);


mongoose.connect(config.db.uri, config.db.options)
    .then(() => {
        console.log('Connected to ATLAS MongoDB');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    }).catch(err => {
        console.error(`Database connection error: ${err}`);
    });


app.listen(config.port, () => {
    console.log(`Express server open on port ${config.port} at localhost:${config.port}`);
})