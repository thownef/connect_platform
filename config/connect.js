import { Sequelize } from "sequelize";

const sequelize = new Sequelize("railway", "root", "LPlqlnbwlNZWZVagUJfLRlVFornlHESF", {
  host: "roundhouse.proxy.rlwy.net",
  port: 37820,
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect db successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection