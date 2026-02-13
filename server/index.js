import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import { Router } from './config/imagekit.js';
import docRouter from './routes/docRoutes.js';
import job from './config/cron.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const PORT = 8080;

const connDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  if (conn) {
    console.log("MongoDB Connected");
  } else {
    console.log("MongoDB not Connected");
  }
};

job.start();

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    })
});

app.use('/api', userRouter);
app.use('/api', docRouter);
app.use('/api', Router);

connDB();
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    
})