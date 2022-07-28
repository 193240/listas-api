const mysql = require('mysql2');

const config2 = {
  host: 'market2.ck3bn4bomvmi.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'adminadmin',
  database: 'basicmarketdb',
};
// const connection = mysql.createPool({
//   host: 'listas.clexg44wbyii.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'basicmarket',
//   database: 'listas',
// });
// Create a MySQL pool
const connection2 = mysql.createConnection(config2);

connection2.connect((err) => {
  if(err) throw err;
  console.log('DB 2 mysql esta conectado');
});
module.exports = connection2;
