import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/member.js";
import companyRoutes from "./routes/company.js";
import categoryRoutes from "./routes/category.js";
import contactRoutes from "./routes/contact.js";
import imageRoutes from "./routes/image.js";
import consultantRoutes from "./routes/consultant.js";
import areaRoutes from "./routes/area.js";
import cors from "cors";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { generateUploadURL } from "./s3.js";
import EmailSender from "./sendEmail.js";
import EmailSenderExpert from "./sendMailExpert.js";
import serverless from "serverless-http";
import EmailSenderUser from "./sendEmailNoti.js";

const router = express.Router();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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

app.use("/server/auth", authRoutes);
app.use("/server/user", userRoutes);
app.use("/server/profile", profileRoutes);
app.use("/server/getcompany", companyRoutes);
app.use("/server/category", categoryRoutes);
app.use("/server/contact", contactRoutes);
app.use("./netlify/functions/index ", router);
app.use("/server/image", imageRoutes);
app.use("/server/consultant", consultantRoutes);
app.use("/server/area", areaRoutes);

app.listen(8080, () => {
  console.log("Connected to backend!");
});

export default serverless(app);
