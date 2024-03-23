import db from '../models';

export const getAll = async (req, res, next) => {
  try {
    const data = await db.User.findAll();
    console.log(data)
    return res.status(200).json({ data, message: "Get Success" });
  } catch (err) {
    next(err)
  }
};
