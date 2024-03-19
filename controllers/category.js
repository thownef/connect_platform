import { db } from '../connect.js';


/**
 * Get information categories
 * @return \Illuminate\Http\Response
 */
export const getCategory = (req, res) => {
    const sql = 'SELECT * FROM category where operator = 1';
  
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json({message: "Internal Server Error!"});
      }
      return res.status(200).json({data: data, message: "Get Success"});
    });
};

export const getCategoryAdmin = (req, res) => {
  const sql = 'SELECT * FROM category';

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

/**
 * Insert information Category
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const InsertCategory = (req, res) => {
    const q = 'INSERT INTO category (`name`, `name_en`, `name_jp`, `url`) VALUES (?)';
    const values = [
      req.body.name, 
      req.body.name_en, 
      req.body.name_jp,
      req.body.url, 
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({insert_data: true});
    });
}

/**
 * Edit information Category
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const editCategory = (req,res)=> {
    const id = req.params.id;
    db.query('SELECT * FROM category WHERE id = ?', id, 
    (err,result)=>{
    if(err) {
      console.log(err)
    } 
        res.send(result)
    });   
};
  
/**
 * PUT update operator Category
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const updateOperatorCategory = (req, res) => {
    const id = req.params.id
    const sql = 'UPDATE category SET operator = ? WHERE id = ?';
  
    db.query(sql, [req.body.operator, id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({update_operator: true});
    });
};

/**
 * PUT update information Category
 * @author PTK
 * @return \Illuminate\Http\Response
 */
export const UpdateCategory = (req, res) => {
    const id = req.params.id
    const sql = 'UPDATE category SET name = ?, name_en = ?, name_jp = ?, url = ? WHERE id = ?';
  
    const values = [
        req.body.name, 
        req.body.name_en, 
        req.body.name_jp,
        req.body.url,  
      id];
  
    db.query(sql,values, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({update_category: true});
    });
  };

