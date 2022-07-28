const mysql = require('mysql2');

const config = {
  host: 'listas.clexg44wbyii.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'basicmarket',
  database: 'listas',
  port: 3306
};
// const connection = mysql.createPool({
//   host: 'listas.clexg44wbyii.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'basicmarket',
//   database: 'listas',
// });
// Create a MySQL pool
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if(err) throw err;
  console.log('DB mysql esta conectado');
});
module.exports = connection;