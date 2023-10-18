const db = require("../models")
const config = require ("../config/auth.config")
const {user:User, role:Role, refreshToken:RefreshToken } = db;
// const User = db.user;
// const Role = db.role;
// const RefreshToken = db.refreshToken;
const jwt = require("jsonwebtoken");
const bcrypt = require ("bcryptjs");
const Op = db.Sequelize.Op;

//SignUp
exports.signup = (req,res) => {
    //save user to DB
    User.create({
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
    }).then (user =>{
            if (req.body.role) {
                Role.findAll({
                    where:{
                        name:{
                            [Op.or]: req.body.roles
                        },
                    },
                }).then (roles => {
                    user.setRoles(roles).then(()=>{
                        res.send({message: "User was registered successfully!"});
                    });
                });
            }else{
                //User roleid =1 (user)
                user.setRoles([1]).then(()=>{
                    res.send({message: "User was registered successfully!"});
                });
            }
    })
    .catch((err)=>{
        res.state(500).send({message: "err.message"});
    });
};

//SignIn
exports.signin =  (req,res) => {
    //SELECT * FROM username WHERE username = req.body.username
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(async user =>{
        if(!user){
            return res.status(404).send({message: "User not found!"})
        }
        let passwordIsvalid = bcrypt.compareSync(req.body.password, user.password)
        if (! passwordIsvalid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        const token = jwt.sign({id:user.id},
            config.secret,
            {
                algorithm:"HS256",
                allowInsecureKeySizes:true,
                expiresIn: config.jwtExpiration, 
            });
        const refreshToken = await RefreshToken.createToken(user);
        let authoriities =[];
        user.getRoles().then((roles) =>{
            for (let i=0; i < roles.length; i++){
                authoriities.push("ROLES_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({id:user.id, 
                username:user.username, 
                email:user.email, 
                roles:authoriities, 
                accessToken: token,
                refreshToken:refreshToken,
            })
        });
    }).catch(err =>{
        res.status(500).send({message: err.message})
    })
};

exports.refreshToken = async (req, res) => {
    const {refreshToken:requestToken} = req.body;
    //check is refresh token is provided 
    //ส่งมาไหม
    if (requestToken == null) {
        return res.status(403).json({ message:"Refresh Token is require" })
    }
    try {
        let refreshToken = await RefreshToken.findOne({
            where:{
                token: requestToken,
            },
        })
        //If refresh token existed is database 
        //มีใน database ไหม
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh Token is not in Database!" })
            return;
        }
        //If refresh token is expired 
        //หมดอายุไหม
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({where:{ id:refreshToken.id } });
            res.status(403).json({ message: "Refresh Token was expired. Please make a new signin request" });
            return;
        }
        const user = await refreshToken.getUser();
        let newAccessToken = token = jwt.sign({ id: user.id },config.secret,{
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: config.jwtExpiration,
            });
            return res.status(200).json({
                accessToken:newAccessToken,
                refreshToken:refreshToken.token
            })

    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

