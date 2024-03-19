import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

export const getAllUser = (req, res) => {
  let { sort, order, pages = 1, limit = 10, search } = req.query;
  const values = [(parseInt(pages) - 1) * parseInt(limit), parseInt(limit)];
  let q =
    'SELECT user_register.*, company_info.user_id, COUNT(viewlog.company_seen_id) AS view_count FROM user_register LEFT JOIN company_info ON user_register.id = company_info.user_id LEFT JOIN viewlog ON user_register.id = viewlog.user_id';
  let countQuery = 'SELECT COUNT(*) as totalCount FROM user_register';
  if (search) {
    const condition = ` WHERE user_name LIKE '%${search}%' OR user_register.email LIKE '%${search}%' OR company_name LIKE '%${search}%' OR company_name_en LIKE '%${search}%' OR company_name_jp LIKE '%${search}%'`;
    q += condition;
    countQuery += condition;
  }

  q += ' GROUP BY user_register.id';

  if (sort && order) {
    q += ` ORDER BY ${sort} ${order}`;
  } else {
    q += ` ORDER BY CASE operator WHEN 'NEW' THEN 0 WHEN 'ACTIVE' THEN 1 WHEN 'PUBLIC' THEN 2 WHEN 'DEACTIVE' THEN 3 ELSE 4 END`;
  }
  q += ' LIMIT ?, ?;';

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    db.query(countQuery, (err, countData) => {
      if (err) {
        return res.status(500).json(err);
      }
      const totalCount = countData[0].totalCount;
      const totalPages = Math.ceil(totalCount / limit);
      return res
        .status(200)
        .json({ data: data, totalCount: totalCount, totalPages: totalPages });
    });
  });
};

export const updateOperator = (req, res) => {
  const id = req.params.id;
  const q = 'UPDATE user_register SET operator = ? WHERE id = ?';

  db.query(q, [req.body.operator, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update: true });
  });
};

/**
 * PUT update allow user register by id
 * @return \Illuminate\Http\Response
 */
export const updateAllow = (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE user_register SET allow = ? WHERE id = ?';

  db.query(sql, [req.body.allow, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update_allow: true });
  });
};

// get user by id
export const getUserId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM user_register WHERE id = ?', id, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({data : data[0], message: "Get user success" });
  });
};

/**
 * PUT update information user register by id
 * @return \Illuminate\Http\Response
 */
export const UpdateUserByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE user_register SET email = ?, password = ?, country = ?, company_name = ?, user_name = ?, phone = ? WHERE id = ?';

  //create password with bcrypt generated 10
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const values = [
    req.body.email,
    hashedPassword,
    req.body.country,
    req.body.company_name,
    req.body.user_name,
    req.body.phone,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json({ update_user: true });
  });
};

export const getUserOperator = (req, res) => {
  const q = "SELECT * FROM user_register WHERE operator LIKE 'NEW' ";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getUserOperatorActive = (req, res) => {
  const q = "SELECT * FROM user_register WHERE operator LIKE 'ACTIVE' ";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getUserOperatorPublic = (req, res) => {
  const q = "SELECT * FROM user_register WHERE operator LIKE 'PUBLIC' ";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getUserOperatorDeActive = (req, res) => {
  const q = "SELECT * FROM user_register WHERE operator LIKE 'DEACTIVE' ";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const DeleteUserID = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM user_register WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

export const viewLog = async (req, res) => {
  const { user_id, company_seen_id } = req.body;

  const q = 'INSERT INTO viewlog (user_id, company_seen_id ) VALUES (?, ?)';
  const values = [user_id, company_seen_id];

  db.query(q, values, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error updating ViewLog', err: err });
    }
    return res.status(200).json({ message: 'ViewLog updated successfully' });
  });
};

export const getViewLog = async (req, res) => {
  const { id } = req.params;

  const q =
    'SELECT viewlog.*, user_register.company_name FROM viewlog LEFT JOIN user_register ON user_register.ID = viewlog.company_seen_id WHERE viewlog.user_id = ?';
  const values = [id];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error ViewLog', err: err });
    }
    return res.json({ data });
  });
};

export const searchViewLog = async (req, res) => {
  let {
    company_name,
    date_start,
    date_end,
    sort = 'viewed_at',
    order = 'DESC',
    pages = 1,
  } = req.query;
  let q = `
  SELECT
    viewlog.*,
    a.company_name as company_name,
    b.company_name as company_seen
  FROM
    viewlog
    LEFT JOIN user_register AS a ON a.ID = viewlog.user_id
    LEFT JOIN user_register as b ON b.ID = viewlog.company_seen_id
  `;

  let qTotal = `
  SELECT COUNT(*) as totalCount
  FROM
    viewlog
    LEFT JOIN user_register AS a ON a.ID = viewlog.user_id
    LEFT JOIN user_register as b ON b.ID = viewlog.company_seen_id
`;

  if (company_name || date_start || date_end) {
    q += ` WHERE `;
    qTotal += ` WHERE `;
    let conditions = [];

    if (company_name) {
      conditions.push(
        `(a.company_name LIKE '%${company_name}%' OR b.company_name LIKE '%${company_name}%')`
      );
    }

    if (date_start && date_end) {
      conditions.push(
        `viewlog.viewed_at BETWEEN '${date_start}' AND '${date_end}'`
      );
    } else if (date_start) {
      conditions.push(`viewlog.viewed_at >= '${date_start}'`);
    } else if (date_end) {
      conditions.push(`viewlog.viewed_at <= '${date_end}'`);
    }

    conditions = conditions.join(' AND ');
    q += conditions;
    qTotal += conditions;
  }

  if (sort) {
    q += ` ORDER BY ${sort} ${order} LIMIT ?, ?`;
  } else {
    q += ` ORDER BY viewed_at DESC LIMIT ?, ?`;
  }

  db.query(q, [(parseInt(pages) - 1) * 10, 10], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    db.query(qTotal, (err, countData) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res
        .status(200)
        .json({ data, totalCount: countData[0].totalCount });
    });
  });
};

export const summaryLog = async (req, res) => {
  let { search, pages = 1 } = req.query;
  let q = ` 
        SELECT 
            ROW_NUMBER() OVER (ORDER BY user_id, company_seen_id) AS id,
            COUNT(*) OVER () AS total,
            user_id,
            a.company_name as company_name,
            company_seen_id,
            b.company_name as company_seen,
            COUNT(*) AS total_rows
        FROM 
          viewlog
        LEFT JOIN user_register AS a ON a.ID = viewlog.user_id
        LEFT JOIN user_register as b ON b.ID = viewlog.company_seen_id
        WHERE a.company_name LIKE "%${search}%" OR b.company_name LIKE "%${search}%"
        GROUP BY 
          user_id, company_seen_id
        HAVING 
          COUNT(*) > 0
        LIMIT ? , ?
  `;

  db.query(q, [(parseInt(pages) - 1) * 10, 10], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data: data, total: data[0].total });
  });
};

export const summaryLogCompany = async (req, res) => {
  let q = ` 
        SELECT ur.id, ur.company_name
        FROM user_register AS ur
        RIGHT JOIN (
            SELECT user_id AS combined_id FROM viewlog
            UNION
            SELECT company_seen_id AS combined_id FROM viewlog
        ) AS combined ON ur.id = combined.combined_id
  `;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data: data });
  });
};

export const summaryLogCompanyDetail = async (req, res) => {
  const { user_id, seen_id } = req.body;

  let q = ` 
    SELECT viewed_at FROM viewlog WHERE user_id = ? AND company_seen_id = ?
    `;

  db.query(q, [user_id, seen_id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data: data });
  });
};
