import { db } from '../connect.js';


export const InsertContact = (req, res) => {
  const q =
    'INSERT INTO contacts (`language_id`,`position`,`id_contact`,`fullname`,`email`, `email_contact`,`company_name`,`company_contact`,`phone`, `description`,`created_at`,`updated_at`) VALUES (?)';
  const values = [
    req.body.language_id,
    req.body.position,
    req.body.id_contact,
    req.body.fullname,
    req.body.email,
    req.body.email_contact,
    req.body.company_name,
    req.body.company_contact,
    req.body.phone,
    req.body.description,
    req.body.created_at,
    req.body.updated_at,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    res.status(200).json({ message: 'Create Success' });
  });
};

export const getContactID = (req,res)=> {
    const id = req.params.id;
    db.query('SELECT * FROM contacts WHERE id = ?', id, 
    (err,result)=>{
    if(err) {
        console.log(err)
    } 
        res.send(result)
    });   
};

export const DeleteContactID = (req,res)=> {
    const id = req.params.id;
    db.query('DELETE FROM contacts WHERE id = ?', id, 
    (err,result)=>{
    if(err) {
      console.log(err)
    } 
        res.send(result)
    });   
};

export const getCompanyContact = (req,res)=> {
    const email = req.params.email;
    db.query('SELECT * FROM contacts WHERE email = ?',email,(err,data)=>{
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({data, message: "Get Success"});
    });   
};

export const updateSeenContact = (req, res) => {
  const id = req.params.id
  db.query('UPDATE contacts SET status = 1 WHERE id = ?', [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    return res.status(200).json({ message: 'update status success' });
  });
};

export const getContactSent = (req,res)=> {
  const email = req.params.email;
  db.query('SELECT * FROM contacts WHERE email_contact = ?',email,(err,data)=>{
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    return res.status(200).json({data, message: "Get Success"});
  });   
};


export const updateAllowEmailContact = (req, res) => {
  const id = req.params.id
  const sql = 'UPDATE contacts SET allow = ? WHERE id = ?';

  db.query(sql, [req.body.allow, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({update_allow: true});
  });
};


export const InsertContactExpert = (req, res) => {
  const q = 'INSERT INTO contact_expert (`company_id`,`expert_name`,`fullname`,`company_name`,`phone`,`email`, `email_contact`,`content`,`created_at`,`expert_id`) VALUES (?)';
  const values = [
    req.body.company_id, 
    req.body.expert_name, 
    req.body.fullname, 
    req.body.company_name,
    req.body.phone, 
    req.body.email, 
    req.body.email_contact, 
    req.body.content, 
    req.body.created_at,
    req.body.expert_id,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
    return res.status(200).json({message: "Create Success"});
  });
}

export const getContactExpertID = (req,res)=> {
  const id = req.params.id;
  db.query('SELECT * FROM contact_expert WHERE id = ?', id, 
  (err,result)=>{
  if(err) {
      console.log(err)
  } 
      res.send(result)
  });   
};

export const DeleteContactExpertID = (req,res)=> {
  const id = req.params.id;
  db.query('DELETE FROM contact_expert WHERE id = ?', id, 
  (err,result)=>{
  if(err) {
    console.log(err)
  } 
      res.send(result)
  });   
};

export const getCompanyContactExpert = (req,res)=> {
  const email = req.params.email;
  db.query('SELECT * FROM contact_expert WHERE email = ?',email,(err,data)=>{
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });   
};

export const getContactSentExpert = (req, res) => {
  const email = req.params.email;
  db.query(
    'SELECT * FROM contact_expert WHERE email_contact = ?',
    email,
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
      }
      return res.status(200).json({ data, message: 'Get Success' });
    }
  );
};

