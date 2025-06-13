const connectDB = require('./configs/db')
const express = require('express');
const app = express();
require('dotenv').config();

const hrRoutes = require('./routes/hr');

app.use(express.json());

app.use('/hr', hrRoutes);

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
    app.listen(process.env.PORT, () => {
        console.log(`Server started at ${process.env.PORT}`);
    })
}

start()