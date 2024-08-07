import express from 'express';
import dotenv from 'dotenv';
import {dbConnection} from './config/db.js';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import adminRoute from './routes/adminRoute.js';
import cors from 'cors';
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use('/api/user', userRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/admin', adminRoute);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

dbConnection();
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

