import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routers/auth-router';
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use('/auth', authRouter);


export default app;