/*const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
  }
);

module.exports = sequelize;
*/

const {Sequelize} = require ("sequelize")

//  nombre de la base de datos -  user - contraseña - {donde esta alojada?,lenguaje, puerto} 

const db = new Sequelize ("dbnodetp","root","root1234",{
    host: "localhost",
    dialect: "mysql",
    port:3306
})

module.exports= db