import express from "express";
import cors from "cors";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import serverless from "serverless-http";
import { generateUploadURL } from "./s3.js";
import EmailSender from "./sendEmail.js";
import EmailSenderExpert from "./sendMailExpert.js";
import EmailSenderUser from "./sendEmailNoti.js";
import connection from "./config/connect.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connection()

const region = "ap-southeast-1";
const bucketName = "vjpconnect";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  accessKeyId,
  secretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post("/upload", upload.single("photos"), function (req, res) {
  console.log(req.file);
  res.send("Successfully uploaded");
});

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.post("/server/send", async (req, res) => {
  try {
    const {
      fullname,
      vocative,
      company_name,
      company_contact,
      email,
      email_contact,
      phone,
      description,
      isContact,
    } = req.body;
    EmailSender({
      fullname,
      vocative,
      company_name,
      company_contact,
      email,
      email_contact,
      phone,
      description,
      isContact,
    });
    res.status(200).json({ message: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error ❌" });
  }
});

app.post("/server/sendExpert", async (req, res) => {
  try {
    const { fullname, expert_name, company_name, email, phone, content } =
      req.body;
    EmailSenderExpert({
      fullname,
      expert_name,
      company_name,
      email,
      phone,
      content,
    });
    res.status(200).json({ message: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error ❌" });
  }
});

app.post("/server/send-user", async (req, res) => {
  try {
    const { fullname, company_name, email, phone } = req.body;
    EmailSenderUser({
      fullname,
      company_name,
      email,
      phone,
    });
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});


app.listen(8080, () => {
  console.log("Connected to backend!");
});

export default serverless(app);
