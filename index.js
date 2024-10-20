const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./routes/user.route');
const noteRouter = require('./routes/note.route');
const cors = require('cors');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT;

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);  // No need for useNewUrlParser or useUnifiedTopology
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process on MongoDB connection failure
    }
}

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'NoteTaking_frontend/frontend/dist')));

// For any routes not handled by the API, serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
