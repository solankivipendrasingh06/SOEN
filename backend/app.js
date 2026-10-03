import express from 'express';
import cookieParser from 'cookie-parser'
 
import morgan from 'morgan'
import connect from './db/db.js'

import userRoutes from '/routes/user.routes.js ';
import cors from 'cors';

connect();

const app = express()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.get("/",(req,res)=>[
    res.json({
        message: "Hello World"
    })
])

export default app 