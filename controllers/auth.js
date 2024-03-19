import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //check exists user
  const q = 'SELECT * FROM user_register WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server 500' });
    }
    if (data.length) {
      return res.status(409).json({ message: 'Email already exists!' });
    }
    //create new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO user_register (`email`, `password`, `country`, `company_name`, `user_name`, `phone`,`company_name_en`,`company_name_jp`,`operator`) VALUES (?)';

    const values = [
      req.body.email,
      hashedPassword,
      req.body.country,
      req.body.company_name,
      req.body.user_name,
      req.body.phone,
      req.body.company_name,
      req.body.company_name,
      req.body.operator
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: 'Create account success' });
    });
  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM user_register WHERE operator != "NEW" and operator != "DEACTIVE" and email = ? ';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res
        .status(404)
        .json({
          message:
            'This account does not exist or has not been confirmed by admin',
        });

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).json({ message: 'Wrong email or password' });
    }
    
    const token = jwt.sign(
      { id: data[0].id, email: data[0].email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token: token, message: 'Login successfully' });
  });
};

export const loginAdmin = (req, res) => {
  const q = 'SELECT * FROM user_admin WHERE email = ? ';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0){
      return res.status(404).send({success: false, message: "Please check your account or password!!"});
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).send({success: false, message: "Wrong password or email"});
    }

    const token = jwt.sign({ id: data[0].id }, 'secretkey');
    const { password, phone, ...others } = data[0];

    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .send({success: true, message: "Login admin successfully", others});
  });
};


export const loginExpert = (req, res) => {
  const q = 'SELECT * FROM support_expert WHERE email = ? ';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0){
      return res.status(404).send({success: false, message: "Please check your account or password!!"});
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).send({success: false, message: "Wrong password or email"});
    }

    const token = jwt.sign({ id: data[0].id }, 'secretkey');
    const { password, phone, ...others } = data[0];

    res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .send({success: true, message: "Login admin successfully", others});
  });
};

