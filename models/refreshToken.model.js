const config = require("../config/auth.config");
const { v4:uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) =>{
    const RefreshToken = sequelize.define("refreshToken",{
        token :{
            type: Sequelize.STRING
        },
        expiryDate:{
            type:Sequelize.DATE
        }
    });
    //วิธีประกาศฟังก์ชั่นของ JS ใน object
    RefreshToken.createToken = async function (user) {
        let expiryAt = new Date();
        expiryAt.setSeconds(expiryAt.getSeconds() + config.jwtRefreshExpiration)
        let _token = uuidv4();
        let refreshToken = await this.create({
            token:_token,
            userId:user.id,
            expiryDate:expiryAt,
        });
        return refreshToken.token
    }

    RefreshToken.verifyExpiration = (token) =>{
        //เวลาที่ได้ token มามันน้อยกว่าเวลาปัจจุบนไหม
        //ถ้าน้อยกว่าแสดงว่า Token หมดอายุ(true), ถ้ามากกว่าแสดงว่ายังไม่หมดอายุ(false)
        return token.expiryDate.getTime() < new Date().getTime();
    }
    return RefreshToken;
}