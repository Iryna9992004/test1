import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routers/auth-router';
dotenv.config()

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

export default app;