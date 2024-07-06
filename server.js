const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config();
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth'); // Import rute autentikasi

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://insighteduadmin:admininsightedu@insightedu.ooqbjaq.mongodb.net/?retryWrites=true&w=majority&appName=insightedu";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Gunakan middleware cors
app.use(cors());

// Middleware untuk parsing body dari JSON
app.use(express.json());

// Gunakan rute untuk API users
app.use('/api/users', userRouter);
// Gunakan rute untuk API autentikasi
app.use('/api', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
