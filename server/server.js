import express from 'express';
import * as dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';
import projectRoute from './routes/projectRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
dotenv.config();

connectDb();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser('SECERT'));

app.use(cors({ origin: true, credentials: true }));

app.use('/api', projectRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port no : ${PORT}`);
});
