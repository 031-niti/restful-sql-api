module.exports = {
    secret: "niti-secret-key",
    //For Production
    // jwtExpiration: 36000, //1H
    // jwtRefreshExpiration:86400, //24H
    
    //For Test
    jwtExpiration: 60, //1 minute
    jwtRefreshExpiration: 120, //2 minute
}