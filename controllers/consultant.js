import { db } from '../connect.js';

export const list = (req, res) => {
  let { keyword, pages = 1, limit = 10 } = req.query;
  let condition = '';
  let countCondition = '';

  if (keyword) {
    condition = `
      WHERE name LIKE ? OR email LIKE ? OR email_vjp LIKE ? OR tel LIKE ?
    `;
    countCondition = `
      WHERE name LIKE ? OR email LIKE ? OR email_vjp LIKE ? OR tel LIKE ?
    `;
  }

  const q = `
    SELECT * FROM consultant 
    ${condition}
    ORDER BY id DESC
    LIMIT ?, ?`;

  const countQuery = `
    SELECT COUNT(*) as count FROM consultant 
    ${countCondition}
  `;

  const values = keyword
    ? [
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        (pages - 1) * limit,
        limit,
      ]
    : [(pages - 1) * limit, limit];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    db.query(
      countQuery,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
      (countErr, countData) => {
        if (countErr) {
          return res.status(500).json({ message: countErr.message });
        }

        return res
          .status(200)
          .json({
            data,
            count: countData[0].count,
            message: 'get data success',
          });
      }
    );
  });
};

export const allList = (req, res) => {
  const q = `SELECT id, name FROM consultant where status = 1`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ data, message: 'get data success' });
  });
};

export const changeActive = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const q = `UPDATE consultant SET status= ? WHERE id = ?`;
  const values = [status, id];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ message: 'update status success' });
  });
};

export const create = (req, res) => {
  const q = 'SELECT * FROM consultant WHERE email = ? OR email_vjp = ?';

  db.query(q, [req.body.email, req.body.email_vjp], (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (data.length) {
      return res.status(409).json({ msg: 'Email already exists!' });
    } else {
      const q =
        'INSERT INTO consultant (`name`, `email_vjp`, `email`, `tel`) VALUES (?)';

      const values = [
        req.body.name,
        req.body.email_vjp,
        req.body.email,
        req.body.tel,
      ];

      db.query(q, [values], (err, data) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ data, message: 'create success' });
      });
    }
  });
};

export const assign = (req, res) => {
  const q = 'SELECT * FROM assignment WHERE company_id = ?';

  db.query(q, [req.body.company_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (data.length) {
      const q = 'UPDATE assignment SET consultant_id = ? WHERE company_id = ?';

      const values = [req.body.consultant_id, req.body.company_id];

      db.query(q, values, (err, data) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ data, message: 'update success' });
      });
    } else {
      const q =
        'INSERT INTO assignment (`consultant_id`, `company_id`) VALUES (?)';

      const values = [req.body.consultant_id, req.body.company_id];

      db.query(q, [values], (err, data) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ data, message: 'create success' });
      });
    }
  });
};

export const getAssignCompany = (req, res) => {
  const id = req.params.id;
  const q =
    'SELECT * FROM assignment INNER JOIN consultant ON consultant.id = assignment.consultant_id WHERE assignment.company_id = ?';

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ data, message: 'get success' });
  });
};

export const getAllAssign = (req, res) => {
  const { keyword, pages = 1, limit = 10 } = req.query;
  let condition = '';
  let countCondition = '';

  if (keyword) {
    condition = `
      WHERE user_register.company_name LIKE ? OR consultant.name LIKE ?
    `;
    countCondition = `
      WHERE user_register.company_name LIKE ? OR consultant.name LIKE ?
    `;
  }

  const q = `
  SELECT consultant.*, user_register.company_name, assignment.id as assignment_id, assignment.updated_at FROM assignment INNER JOIN consultant ON consultant.id = assignment.consultant_id INNER JOIN user_register ON user_register.id = assignment.company_id
    ${condition}
    ORDER BY id DESC
    LIMIT ?, ?`;

  const countQuery = `
  SELECT COUNT(*) AS total_count FROM assignment INNER JOIN consultant ON consultant.id = assignment.consultant_id INNER JOIN user_register ON user_register.id = assignment.company_id 
    ${countCondition}
  `;

  const values = keyword
    ? [`%${keyword}%`, `%${keyword}%`, (pages - 1) * limit, limit]
    : [(pages - 1) * limit, limit];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    db.query(
      countQuery,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
      (countErr, countData) => {
        if (countErr) {
          return res.status(500).json({ message: countErr.message });
        }

        return res
          .status(200)
          .json({
            data,
            count: countData[0].total_count,
            message: 'get data success',
          });
      }
    );
  });
};

export const deleteAssign = (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM assignment WHERE id = ${id}`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ message: 'delete success' });
  });
};
