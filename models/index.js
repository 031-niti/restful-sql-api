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

//สร้าง connection
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model")(sequelize, Sequelize);

// M-M = Many To Many
db.role.belongsToMany(db.user,{
    through:"users_roles"
});
db.user.belongsToMany(db.role,{
    through:"users_roles"
});

// 1-1 = one To one 
db.refreshToken.belongsTo(db.user,{
    foreignKey:"userId",
    targetKey:"id"  
})
db.user.hasOne(db.refreshToken, {
    foreignKey: "userId",
    targetKey: "id" 
})

db.ROLES=["user", "admin", "moderator"]

module.exports = db;
