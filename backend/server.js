const express = require('express');
require('dotenv').config();
const noteRoute = require('./routes/notes');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database conntected.');
        
        app.listen(process.env.PORT, () => {
            console.log(`port ${process.env.PORT} listening...`);
        });
    })
    .catch(err => {
        console.log(err);
    })

app.use('/api/notes', noteRoute);
