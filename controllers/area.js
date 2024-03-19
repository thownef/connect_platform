import { db } from "../connect.js";

export const getArea = (req, res) => {
  const sql = "SELECT * FROM area where operator = 1";

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data, message: "Get data success" });
  });
};
