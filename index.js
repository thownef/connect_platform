import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/connect";
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connection()

app.use('/api/user', userRoutes);

app.listen(8888, () => {
  console.log("Connected to backend")
})