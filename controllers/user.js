import db from '../models';

const { user_register } = db

export const getAll = async (req, res, next) => {
  try {
    const data = await user_register.findAll();
    console.log(data)
    return res.status(200).json({ data, message: "Get Success" });
  } catch (err) {
    next(err)
  }
};
