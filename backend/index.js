import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
 
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI;

app.use('/api/users', userRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Database is connected BRO"))
    .catch((err) => console.log("Error while connecting to database is: ", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});