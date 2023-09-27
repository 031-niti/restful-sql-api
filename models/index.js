const config = require("../config/db.config")

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,{
    host:config.HOST,
    dialect:config.dialect,
    dialectOptions:{
        ssl:{
            required:true,
            rejectUnauthorized:false
        }
    },
    pool:{
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle : config.pool.idle
    }
})

//สร้างตัวแปร db
const db = {};
db.Sequelize = Sequelize;
db.sequelize= sequelize;

//require พร้อมส่งค่าพารามิเตอร์ไปในตัว
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);

// 1 - M

db.role.belongsToMany(db.user,{
    through:"users_roles"
});

db.user.belongsToMany(db.role,{
    through:"users_roles"
});

db.ROLES=["user", "admin", "moderator"]

module.exports = db;
