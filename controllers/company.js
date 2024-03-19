import { db } from '../connect.js';
import { QUERY_UPDATE_PROFILE } from '../constant/constant.js';
import bcrypt from 'bcryptjs';
import { deleteImage } from '../s3.js';

export const getCompannyProfile = (req, res) => {
  const q =`
    SELECT a.*, b.country, b.id as company_ID, b.*, c.name as category_vn, c.name_en as category_en, c.name_jp as category_jp FROM company_info as a inner join user_register as b on a.email = b.email INNER JOIN category as c ON a.category = c.id WHERE b.id = ?; 
    SELECT a.*, b.id as company_ID FROM company_description as a inner join user_register as b on a.email = b.email where b.id = ?; 
    SELECT a.*, b.id as company_ID FROM company_products as a inner join user_register as b on a.email = b.email WHERE b.id = ?; 
    SELECT a.*, b.id as company_ID FROM company_specialties as a inner join user_register as b on a.email = b.email WHERE b.id = ?; 
    SELECT a.*, b.id as company_ID FROM company_core_members as a inner join user_register as b on a.email = b.email WHERE b.id = ?; 
    SELECT a.*, b.id as company_ID FROM company_main_clients as a inner join user_register as b on a.email = b.email WHERE b.id = ?; 
    SELECT DISTINCT a.id as company_ID, b.slot_number as slot_booking, b.start_time_booking, b.end_time_booking, a.company_name as company_name_booked, c.company_name_booking FROM user_register as a inner join slot_booking as b left join booking as c on company_name = c.company_name_booked and c.slot_booking = slot_number where a.id = ?;
    SELECT * FROM review WHERE user_id = ?
  `;

  db.query(
    q,
    [
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
      req.params.user_id,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({
        company_info: data[0],
        company_description: data[1],
        company_products: data[2],
        company_specialties: data[3],
        company_core_members: data[4],
        company_main_clients: data[5],
        slot_booking: data[6],
        review: data[7],
      });
    }
  );
};

export const getFourCompanyJapan = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID, b.*, c.name as category_vn, c.name_en as category_en, c.name_jp as category_jp FROM company_info as a inner join user_register as b on a.email = b.email INNER JOIN category as c ON a.category = c.id where a.allow = 1 and b.country = "Japan" and b.highlight = 1 ;';
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    return res.status(200).json({
      data: data.map(item => {
        const { password, ...newItem } = item;
        return newItem;
      }),
      message: 'Get Success',
    });
  });
};

export const getFourCompanyVietNam = (req, res) => {
  const q =
    'SELECT a.*, b.country, b.id as company_ID, b.*, c.name as category_vn, c.name_en as category_en, c.name_jp as category_jp FROM company_info as a inner join user_register as b on a.email = b.email INNER JOIN category as c ON a.category = c.id where a.allow = 1 and b.country = "Viet Nam" and b.highlight = 1 ;';
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    return res.status(200).json({
      data: data.map(item => {
        const { password, ...newItem } = item;
        return newItem;
      }),
      message: 'Get Success',
    });
  });
};

export const getCompanyByKeyword = (req, res) => {
  const { category, country, pages = 1, limit = 10, keyword } = req.query;

  let countQuery = `SELECT COUNT(*) AS totalCount
                    FROM company_info as a
                    INNER JOIN user_register as b ON a.email = b.email
                    WHERE a.allow = 1 and b.operator = "PUBLIC" and country = ?`;
  const countQueryParams = [country];

  let q = `SELECT a.*, b.country, b.id as company_ID, b.*, c.name as category_vn, c.name_en as category_en, c.name_jp as category_jp
              FROM company_info as a
              INNER JOIN user_register as b ON a.email = b.email
              INNER JOIN category as c ON a.category = c.id
              WHERE a.allow = 1 and b.operator = "PUBLIC" and country = ?`;
  const queryParams = [country];

  if (keyword) {
    countQuery += ` AND (
                      b.company_name LIKE ? OR b.company_name_en LIKE ? OR b.company_name_jp LIKE ? OR a.estalishment LIKE ? OR 
                      a.employers LIKE ? OR a.needs_vn LIKE ? OR a.needs_en LIKE ? OR a.needs_jp LIKE ? OR a.address_vn LIKE ? OR a.address_en LIKE ? OR a.address_jp LIKE ?
                    )`;
    q += ` AND (
                b.company_name LIKE ? OR b.company_name_en LIKE ? OR b.company_name_jp LIKE ? OR a.estalishment LIKE ? OR 
                a.employers LIKE ? OR a.needs_vn LIKE ? OR a.needs_en LIKE ? OR a.needs_jp LIKE ? OR a.address_vn LIKE ? OR a.address_en LIKE ? OR a.address_jp LIKE ?
              )`;

    const searchKeyword = `%${keyword}%`;
    for (let i = 0; i < 11; i++) {
      countQueryParams.push(searchKeyword);
      queryParams.push(searchKeyword);
    }
  }

  if (category) {
    countQuery += ' AND category = ? ';
    q += ' AND category = ? ';
    countQueryParams.push(category);
    queryParams.push(category);
  }

  countQuery += ';';
  q += ' LIMIT ?, ?;';
  queryParams.push((pages - 1) * limit, limit);

  db.query(countQuery, countQueryParams, (err, countResult) => {
    if (err) {
      return res.status(500).send(err);
    }

    const totalCount = countResult[0].totalCount;

    db.query(q, queryParams, (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      const totalPages = Math.ceil(totalCount / limit);

      return res.status(200).json({
        totalResults: totalCount,
        totalPages: totalPages,
        currentPage: pages,
        data: data.map((item) => {
          const { password, ...newItem } = item;
          return newItem;
        }),
        message: "Get Success"
      });
    });
  });
};

export const updateIntroduce = (req, res) => {
  const id = req.params.id
  const q =
    'UPDATE company_description SET description = ?, descriptionEN = ?, descriptionJP = ? WHERE user_id = ?';

  db.query(
    q,
    [
      req.body.description,
      req.body.descriptionEN,
      req.body.descriptionJP,
      id
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }
      return res.status(200).json({message: "Update Success"});
    }
  );
};

export const updateProduct = (req, res) => {
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_PRODUCT,
      [
        req.body[index].product_name,
        req.body[index].product_name_EN,
        req.body[index].product_name_JP,
        req.body[index].product_description,
        req.body[index].product_description_EN,
        req.body[index].product_description_JP,
        req.body[index].product_picture,
        req.body[index].product_url,
        req.body[index].id,
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1) {
          return res.status(200).json(data);
        }
      }
    );
  }
};

export const updateSpecialties = (req, res) => {
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_FEATURES,
      [
        req.body[index].speciality_desc,
        req.body[index].speciality_desc_en,
        req.body[index].speciality_desc_jp,
        req.body[index].speciality_picture,
        req.body[index].id,
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1) {
          return res.status(200).json(data);
        }
      }
    );
  }
};

export const updateCoreMember = (req, res) => {
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_CORE_MEMBER,
      [
        req.body[index].member_desc,
        req.body[index].member_desc_EN,
        req.body[index].member_desc_JP,
        req.body[index].member_name,
        req.body[index].member_picture,
        req.body[index].member_position,
        req.body[index].member_position_EN,
        req.body[index].member_position_JP,
        req.body[index].id,
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1) {
          return res.status(200).json(data);
        }
      }
    );
  }
};

export const createClient = (req, res) => {
  const selectResults = 'SELECT email FROM user_register WHERE id = ?';

  db.query(selectResults, [req.body.user_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    const email = data[0].email
    const q =
      'INSERT INTO company_main_clients (`email`, `user_id`, `client_name`, `client_logo`, `client_url`, `client_url_EN`, `client_url_JP`) VALUES (?)';

    const values = [
      email,
      req.body.user_id,
      req.body.client_name,
      req.body.client_logo,
      req.body.client_url,
      req.body.client_url_EN,
      req.body.client_url_JP,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({ message: 'Create Success!' });
    });
  });
}

export const deleteClient = (req, res) => {
  const id = req.params.id;
  try {
    db.query('SELECT client_logo FROM company_main_clients WHERE id = ?', id, async (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      if (!data || !data[0] || !data[0].client_logo) {
        db.query('DELETE FROM company_main_clients WHERE id = ?', id, (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
            res.status(200).json({message:"Deleted"});
        });
      } else {
        let imageName = data[0].client_logo.split('/').slice(3).join('/');
        db.query('DELETE FROM company_main_clients WHERE id = ?', id, async (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
  
          try {
            await deleteImage(imageName);
            res.status(200).json({message:"Deleted"});
          } catch (imageError) {
            res.status(500).json({ message: 'Error deleting image!' });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
}

export const getClient = (req, res) => {
  const id = req.params.id
  db.query('SELECT * FROM company_main_clients WHERE id = ?', id, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    res.status(200).json({data: data[0], message: "Get Success" });
  });
}

export const updateClient = (req, res) => {
  const id = req.params.id
  const q = 'UPDATE company_main_clients SET client_name = ?, client_logo= ?, client_url= ?, client_url_EN= ?,client_url_JP = ? WHERE id = ?'
  const values = [
    req.body.client_name,
    req.body.client_logo,
    req.body.client_url,
    req.body.client_url_EN,
    req.body.client_url_JP,
    id
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }

    return res.status(200).json({ message: "Update Success" });
  });
};

export const updateInfo = (req, res) => {
  for (let index = 0; index < req.body.length; index++) {
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_UPDATE_INFO,
      [
        req.body[index].company_name_jp,
        req.body[index].company_name_en,
        req.body[index].estalishment,
        req.body[index].employers,
        req.body[index].needs_vn,
        req.body[index].needs_en,
        req.body[index].needs_jp,
        req.body[index].company_logo,
        req.body[index].languages,
        req.body[index].category,
        req.body[index].capital,
        req.body[index].address_vn,
        req.body[index].address_en,
        req.body[index].address_jp,
        req.body[index].company_name,
        req.body[index].info_url,
        req.body[index].id,
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (index === req.body.length - 1) {
          return res.status(200).json(data);
        }
      }
    );
  }
};

/**
 * GET information company info
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const getAllCompanyAdmin = (req, res) => {
  let { sort, order, pages = 1, limit = 10, search } = req.query;
  const values = [(parseInt(pages) - 1) * parseInt(limit), parseInt(limit)];

  let q =
    'SELECT company_info.id as id_company, company_info.*, user_register.* FROM company_info INNER JOIN user_register ON user_register.id = company_info.user_id';
  let countQuery =
    'SELECT COUNT(*) as totalCount FROM company_info INNER JOIN user_register ON user_register.id = company_info.user_id';
  if (search) {
    const condition = ` WHERE user_name LIKE '%${search}%' OR user_register.email LIKE '%${search}%' OR company_name LIKE '%${search}%' OR company_name_en LIKE '%${search}%' OR company_name_jp LIKE '%${search}%'`;
    q += condition;
    countQuery += condition;
  }

  if (sort && order) {
    sort === 'email'
      ? (q += ` ORDER BY user_register.${sort} ${order}`)
      : (q += ` ORDER BY ${sort} ${order}`);
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

export const getCompanyByCategoryCountry = (req, res) => {
  const { category, country, pages, limit } = req.body;
  const q = `SELECT a.*, b.country, b.id as company_ID 
            FROM company_info as a 
            INNER JOIN user_register as b ON a.email = b.email 
            WHERE category = ? AND country = ? 
            LIMIT ?, ?;`;
  db.query(q, [category, country, pages, limit], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

/**
 * PUT update allow company info by id
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const updateAllow = (req, res) => {
  const id = req.params.id;
  const sql = `
  UPDATE company_info INNER JOIN user_register ON company_info.user_id = user_register.id
  SET company_info.allow = ?,
      user_register.allow = ?
  WHERE user_id = ?`;

  db.query(sql, [req.body.allow, req.body.allow, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update_allow: true });
  });
};

export const getCompanyID = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT company_name, company_name_en, company_name_jp, company_info.* FROM user_register INNER JOIN company_info ON user_register.id = company_info.user_id WHERE company_info.user_id = ?',
    id,
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      return res.status(200).json({data: data[0], message: "Get data success"});
    }
  );
};

export const getIntroduce = (req, res) => {
  const id = req.params.id;
  const q = 'SELECT * FROM company_description WHERE user_id = ?';

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data: data[0], message: 'Get data success' });
  });
};

export const UpdateCompanyByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE company_info SET address_en = ?, address_jp = ?, address_vn = ?, capital = ?, category = ?, company_logo = ?,  employers = ?, estalishment = ?, info_url = ?, needs_en = ?, needs_jp = ?, needs_vn = ?, languages = ?, area = ? WHERE id = ?';

  const values = [
    req.body.address_en,
    req.body.address_jp,
    req.body.address_vn,
    req.body.capital,
    req.body.category,
    req.body.company_logo,
    req.body.employers,
    req.body.estalishment,
    req.body.info_url,
    req.body.needs_en,
    req.body.needs_jp,
    req.body.needs_vn,
    req.body.languages,
    req.body.area,
    id,
  ];

  const sql1 =
    'UPDATE user_register JOIN company_info ON user_register.id = company_info.user_id SET company_name = ?, company_name_en = ?, company_name_jp = ? WHERE company_info.id = ?';

  const values1 = [
    req.body.company_name,
    req.body.company_name_en,
    req.body.company_name_jp,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }

    db.query(sql1, values1, (err, result) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      return res.status(200).json({ message: "Update Success!" });
    });
  });
};

export const getCompanyProduct = (req, res) => {
  const user_id = req.params.id;
  db.query(
    'SELECT * FROM company_products WHERE user_id = ?',
    user_id,
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    }
  );
};

export const getCompanyProductID = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM company_products WHERE id = ?', id, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    res.status(200).json({data: data[0], message: "Get Data Success"});
  });
};

export const UpdateProductByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE company_products SET product_name = ?, product_description = ?, product_picture = ?, product_url = ?, product_name_EN = ?, product_name_JP = ?, product_description_EN = ?, product_description_JP = ? WHERE id = ?';

  const values = [
    req.body.product_name,
    req.body.product_description,
    req.body.product_picture,
    req.body.product_url,
    req.body.product_name_EN,
    req.body.product_name_JP,
    req.body.product_description_EN,
    req.body.product_description_JP,
    id,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    return res.status(200).json({ message: "Update Success!" });
  });
};

// Đang vá bug tạm thời cho tuankiet
export const InsertProductByID = (req, res) => {
  const selectResults = 'SELECT email FROM user_register WHERE id = ?';

  db.query(selectResults, [req.body.user_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    const email = data[0].email
    const q =
      'INSERT INTO company_products (`email`, `user_id`, `product_description`, `product_description_EN`, `product_description_JP`, `product_name`, `product_name_EN`, `product_name_JP`, `product_picture`, `product_url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [
      email,
      req.body.user_id,
      req.body.product_description,
      req.body.product_description_EN,
      req.body.product_description_JP,
      req.body.product_name,
      req.body.product_name_EN,
      req.body.product_name_JP,
      req.body.product_picture,
      req.body.product_url,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({ message: 'Create Success!' });
    });
  });
};

/**
 * Insert information Member cors
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const InsertMember = (req, res) => {
  const selectResults = 'SELECT email FROM user_register WHERE id = ?';

  db.query(selectResults, [req.body.user_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    const email = data[0].email
    const q =
      'INSERT INTO company_core_members (`email`, `user_id`, `member_desc`, `member_desc_EN`,`member_desc_JP`,`member_name`, `member_picture`, `member_position`, `member_position_EN`, `member_position_JP`) VALUES (?)';

      const values = [
        email,
        req.body.user_id,
        req.body.member_desc,
        req.body.member_desc_EN,
        req.body.member_desc_JP,
        req.body.member_name,
        req.body.member_picture,
        req.body.member_position,
        req.body.member_position_EN,
        req.body.member_position_JP,
      ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({ message: 'Create Success!' });
    });
  });
};

/**
 * Edit information company Product by id
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const getMemberID = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM company_core_members WHERE id = ?',
    id,
    (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }
      return res.status(200).json({ data: data[0], message: 'Get Success!' });
    }
  );
};

export const UpdateMemberByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE company_core_members SET member_desc = ?, member_desc_EN = ?, member_desc_JP = ?, member_name = ?, member_picture = ?, member_position = ?, member_position_EN = ?, member_position_JP = ? WHERE id = ?';

  const values = [
    req.body.member_desc,
    req.body.member_desc_EN,
    req.body.member_desc_JP,
    req.body.member_name,
    req.body.member_picture,
    req.body.member_position,
    req.body.member_position_EN,
    req.body.member_position_JP,
    id,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    return res.status(200).json({ message: 'Update Success!' });
  });
};

/**
 * Insert information Feature cors
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const InsertFeature = (req, res) => {
  const selectResults = 'SELECT email FROM user_register WHERE id = ?';

  db.query(selectResults, [req.body.user_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    const email = data[0].email
    const q =
      'INSERT INTO company_specialties  ( `user_id`, `email`, `speciality_desc`, `speciality_desc_en`,`speciality_desc_jp`,`speciality_picture`) VALUES (?)';

      const values = [
        req.body.user_id,
        email,
        req.body.speciality_desc,
        req.body.speciality_desc_en,
        req.body.speciality_desc_jp,
        req.body.speciality_picture,
      ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({ message: 'Create Success!' });
    });
  });
};

/**
 * Edit information Feature by id
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const getFeatureID = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM company_specialties WHERE id = ?',
    id,
    (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }
      res.status(200).json({data: data[0], message:"Get Success"});
    }
  );
};

export const UpdateFeatureByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE company_specialties SET speciality_desc = ?, speciality_desc_en = ?, speciality_desc_jp = ?, speciality_picture = ? WHERE id = ?';

  const values = [
    req.body.speciality_desc,
    req.body.speciality_desc_en,
    req.body.speciality_desc_jp,
    req.body.speciality_picture,
    id,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    res.status(200).json({message:"Update Success"});
  });
};

export const DeleteFeatureID = (req, res) => {
  const id = req.params.id;
  try {
    db.query('SELECT speciality_picture FROM company_specialties WHERE id = ?', id, async (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      if (!data || !data[0] || !data[0].speciality_picture) {
        db.query('DELETE FROM company_specialties WHERE id = ?', id, (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
            res.status(200).json({message:"Deleted"});
        });
      } else {
        let imageName = data[0].speciality_picture.split('/').slice(3).join('/');
        db.query('DELETE FROM company_specialties WHERE id = ?', id, async (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
  
          try {
            await deleteImage(imageName);
            res.status(200).json({message:"Deleted"});
          } catch (imageError) {
            res.status(500).json({ message: 'Error deleting image!' });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

/**
 * Insert information Feature cors
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const InsertCompanyInfo = (req, res) => {
  const q = 'INSERT INTO company_info  (`company_name`, `email`) VALUES (?)';
  const values = [req.body.company_name, req.body.email];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ insert_company: true });
  });
};

export const getAllCompanyHET = (req, res) => {
  const q = 'SELECT * FROM company_info where allow = 1';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const InsertOperator = (req, res) => {
  const q =
    'INSERT INTO operator_user (`company_name`,`user_name`, `email`,`status`) VALUES (?)';
  const values = [
    req.body.company_name,
    req.body.user_name,
    req.body.email,
    req.body.status,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ insert_product: true });
  });
};

export const UpdateOperator = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE operator_user SET company_name = ?, user_name = ?, email = ?, status = ? WHERE id = ?';

  const values = [
    req.body.company_name,
    req.body.user_name,
    req.body.email,
    req.body.status,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update_feature: true });
  });
};

export const getOperatorByID = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM operator_user WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

export const getOperator = (req, res) => {
  db.query(
    'SELECT a.*, b.country, b.id as company_ID  FROM operator_user as a LEFT JOIN user_register as b ON a.email = b.email',
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
};

export const InsertExpert = (req, res) => {
  const q = 'SELECT * FROM support_expert WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json({ msg: 'Email already exists!' });
    }
    //create new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO support_expert (`email`,`user_name`,`password`,`user_name_en`, `user_name_jp`,`langues`,`specialize_vn`,`specialize_en`, `specialize_jp`,`experience_vn`,`experience_en`,`experience_jp`,`education_vn`, `education_en`,`education_jp`, `image`, `allow`) VALUES (?)';
    const values = [
      req.body.email,
      req.body.user_name,
      hashedPassword,
      req.body.user_name_en,
      req.body.user_name_jp,
      req.body.langues,
      req.body.specialize_vn,
      req.body.specialize_en,
      req.body.specialize_jp,
      req.body.experience_vn,
      req.body.experience_en,
      req.body.experience_jp,
      req.body.education_vn,
      req.body.education_en,
      req.body.education_jp,
      req.body.image,
      req.body.allow,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({ insert_success: true });
    });
  });
};

export const DeleteExpertID = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM support_expert WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

export const DeleteProductID = async (req, res) => {
  const id = req.params.id;
  try {
    db.query('SELECT product_picture FROM company_products WHERE id = ?', id, async (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      if (!data || !data[0] || !data[0].product_picture) {
        db.query('DELETE FROM company_products WHERE id = ?', id, (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
            res.status(200).json({message:"Deleted"});
        });
      } else {
        let imageName = data[0].product_picture.split('/').slice(3).join('/');
        db.query('DELETE FROM company_products WHERE id = ?', id, async (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
  
          try {
            await deleteImage(imageName);
            res.status(200).json({message:"Deleted"});
          } catch (imageError) {
            res.status(500).json({ message: 'Error deleting image!' });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const DeleteMemberID = (req, res) => {
  const id = req.params.id;
  try {
    db.query('SELECT member_picture FROM company_core_members WHERE id = ?', id, async (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }

      if (!data || !data[0] || !data[0].member_picture) {
        db.query('DELETE FROM company_core_members WHERE id = ?', id, (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
            res.status(200).json({message:"Deleted"});
        });
      } else {
        let imageName = data[0].member_picture.split('/').slice(3).join('/');
        db.query('DELETE FROM company_core_members WHERE id = ?', id, async (err, data) => {
          if (err) {
            return res.status(500).json({message: "Internal Server Error!"});
          }
  
          try {
            await deleteImage(imageName);
            res.status(200).json({message:"Deleted"});
          } catch (imageError) {
            res.status(500).json({ message: 'Error deleting image!' });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

export const getDataExpert = (req, res) => {
  const q = 'SELECT * FROM support_expert';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getDataExpertNew = (req, res) => {
  const q = 'SELECT * FROM support_expert WHERE allow = 0';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getDataExpertPublic = (req, res) => {
  const q = 'SELECT * FROM support_expert WHERE allow = 1';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const getDataExpertDeactive = (req, res) => {
  const q = 'SELECT * FROM support_expert WHERE allow = 2';

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

/**
 * Edit information Feature by id
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const getExpertID = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM support_expert WHERE id = ?', id, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal Server Error!"});
    }
    res.status(200).json({data: data[0], message: "Get Success"});
  });
};

/**
 * PUT update allow company info by id
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const updateAllowExpert = (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE support_expert SET allow = ? WHERE id = ?';

  db.query(sql, [req.body.allow, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update_allow: true });
  });
};

export const UpdateExpertByID = (req, res) => {
  const id = req.params.id;
  const sql =
    'UPDATE support_expert SET user_name = ?, user_name_en = ?, user_name_jp = ?, langues = ?, specialize_vn = ?, specialize_en = ?, specialize_jp = ?, experience_vn = ?, experience_en = ?, experience_jp = ?, education_vn = ?, education_en = ?, education_jp = ?, image = ? WHERE id = ?';

  const values = [
    req.body.user_name,
    req.body.user_name_en,
    req.body.user_name_jp,
    req.body.langues,
    req.body.specialize_vn,
    req.body.specialize_en,
    req.body.specialize_jp,
    req.body.experience_vn,
    req.body.experience_en,
    req.body.experience_jp,
    req.body.education_vn,
    req.body.education_en,
    req.body.education_jp,
    req.body.image,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ update_feature: true });
  });
};

export const UpdateExpert = (req, res) => {
  const id = req.params.id;
  //create new user
  const salt = bcrypt.genSaltSync(10);
  let hashedPassword;

  if (req.body.password) {
    hashedPassword = bcrypt.hashSync(req.body.password, salt);
  }

  const sql =
    'UPDATE support_expert SET user_name = ?, email = ?, user_name_en = ?, user_name_jp = ?, langues = ?, specialize_vn = ?, specialize_en = ?, specialize_jp = ?, experience_vn = ?, experience_en = ?, experience_jp = ?, education_vn = ?, education_en = ?, education_jp = ?, image = ?' +
    (req.body.password ? ', password = ?' : '') + ' WHERE id = ?';

  const values = [
    req.body.user_name,
    req.body.email,
    req.body.user_name_en,
    req.body.user_name_jp,
    req.body.langues,
    req.body.specialize_vn,
    req.body.specialize_en,
    req.body.specialize_jp,
    req.body.experience_vn,
    req.body.experience_en,
    req.body.experience_jp,
    req.body.education_vn,
    req.body.education_en,
    req.body.education_jp,
    req.body.image,
  ];

  if (req.body.password) {
    values.push(hashedPassword);
  }

  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    const sql1 = 'UPDATE contact_expert SET email = ? WHERE expert_id = ?';
    const values1 = [req.body.email, id];

    db.query(sql1, values1, (errContact, resultContact) => {
      if (errContact) {
        return res.status(500).json(errContact);
      }

      return res.json({ update_feature: true });
    });
  });
};

export const getExpertClient = (req, res) => {
  const { search } = req.query;
  const q =
    'SELECT * FROM support_expert WHERE (user_name LIKE ? OR user_name_en LIKE ? OR user_name_jp LIKE ? OR langues LIKE ? OR specialize_vn LIKE ? OR specialize_en LIKE ? OR specialize_jp LIKE ? OR experience_vn LIKE ? OR  experience_en LIKE ? OR experience_jp LIKE ? OR education_vn LIKE ? OR education_en LIKE ? OR education_jp LIKE ?) AND allow = 1';

  db.query(
    q,
    [
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
      '%' + search + '%',
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }
      return res.status(200).json({data, message: "Get Success"});
    }
  );
};

//review

export const getReview = (req, res) => {
  const user_id = req.params.id;
  const q = 'SELECT * FROM `review` WHERE user_id = ?';
  db.query(q, [user_id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const createReview = (req, res) => {
  const { user_id, content_vn, content_en, content_jp, review_img } = req.body;
  const q =
    'INSERT INTO review (user_id, content_vn, content_en, content_jp, review_img ) VALUES (?)';
    const values = [
      req.body.user_id,
      req.body.content_vn,
      req.body.content_en,
      req.body.content_jp,
      req.body.review_img
    ];
  db.query(
    q,
    [values],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
        return res.status(200).json({ message: 'Create Success' });
    }
  );
};

export const getReviewId = (req, res) => {
  const id = req.params.id;
  const q = 'SELECT * FROM `review` WHERE id = ?';
  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({data, message: "Get data success"});
  });
};

export const updateReview = (req, res) => {
  const id = req.params.id;
  const q =
    'UPDATE review SET content_vn = ?, content_en = ?, content_jp = ?, review_img = ? WHERE id = ?';

  const values = [
    req.body.content_vn,
    req.body.content_en,
    req.body.content_jp,
    req.body.review_img,
    id
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data, message: 'update data success' });
  });
};

export const deleteReview = (req, res) => {
  const id = req.params.id;
  const q =
    'DELETE FROM review WHERE id = ?';

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ data, message: 'delete data success' });
  });
};

export const getCompanyVic = (req, res) => {
  const { keyword, area, country, pages = 1, limit = 10 } = req.query;

  let q = `SELECT a.*, b.country, b.id as company_ID, b.*, c.name as category_vn, c.name_en as category_en, c.name_jp as category_jp FROM company_info as a INNER JOIN user_register as b ON a.email = b.email INNER JOIN category as c ON a.category = c.id WHERE a.allow = 1 and b.operator = "PUBLIC" and category = 6`;
  let countQuery = `SELECT COUNT(*) as totalCount FROM company_info as a INNER JOIN user_register as b ON a.email = b.email WHERE a.allow = 1 and b.operator = "PUBLIC" and category = 6`;
  const queryParams = [];
  const countParams = [];

  if (keyword) {
    const searchKeyword = `%${keyword}%`;
    q += ` AND ( b.company_name LIKE ? OR b.company_name_en LIKE ? OR b.company_name_jp LIKE ? OR a.estalishment LIKE ? OR a.employers LIKE ? OR a.needs_vn LIKE ? OR a.address_vn LIKE ? OR a.address_en LIKE ? OR a.address_jp LIKE ?)`;
    countQuery += ` AND ( b.company_name LIKE ? OR b.company_name_en LIKE ? OR b.company_name_jp LIKE ? OR a.estalishment LIKE ? OR a.employers LIKE ? OR a.needs_vn LIKE ? OR a.address_vn LIKE ? OR a.address_en LIKE ? OR a.address_jp LIKE ?)`;
    for (let i = 0; i < 9; i++) {
      queryParams.push(searchKeyword);
      countParams.push(searchKeyword);
    }
  }

  if (area) {
    q += ' AND area = ? ';
    queryParams.push(area);

    countQuery += ' AND area = ? ';
    countParams.push(area);
  }

  if (country) {
    q += ' AND country = ? ';
    queryParams.push(country);

    countQuery += ' AND country = ? ';
    countParams.push(country);
  }

  db.query(countQuery, countParams, (countErr, countData) => {
    if (countErr) {
      return res.status(500).send(countErr);
    }

    const totalCount = countData[0].totalCount;

    q += ' LIMIT ?, ?;';
    queryParams.push((pages - 1) * limit, limit);
    db.query(q, queryParams, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).json({
        currentPage: pages,
        totalCount: totalCount,
        data: data,
      });
    });
  });
};

