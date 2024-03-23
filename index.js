import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/connect";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connection()

app.listen(8888, () => {
  console.log("Connected to backend")
})