const {Sequelize} = require("sequelize");
const dbconfig = require("../config/db.config");

//Create sequelize instance
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host:dbconfig.HOST,
    dialect:"postgres",
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthoeized:false,
        },
    }
});

//Tset database connection
async function testConnection(){
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

testConnection();
module.exports = sequelize;