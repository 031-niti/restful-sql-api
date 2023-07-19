const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Restaurant = sequelize.define("restaurant",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        autoIncrement: false,
    },
    type:{
        type:DataTypes.STRING,
        autoIncrement: false,
    },
    imageURL:{
        type:DataTypes.STRING,
        autoIncrement: false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    }
})

module.exports = Restaurant;