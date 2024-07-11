const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); 
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

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

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

app.use('/api/users', userRouter);
app.use('/api', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
