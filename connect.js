import mysql from 'mysql2';
export const db = mysql.createConnection({
  host: '192.168.0.222',
  port: 3306,
  user: 'thodev',
  password: 'password',
  database: 'vjbc',
});
