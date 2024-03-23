import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});

// export const sequelize = new Sequelize("vjc", "root", null, {
//   host: "localhost",
//   // port: 37820,
//   dialect: "mysql",
// });

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect db successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection