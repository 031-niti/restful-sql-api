const sql = require("./db");

//Constructor(เมดตอดที่มีชื่อเดียวกับคลาส)
const Restaurant = function (restaurant) {
    //Atrributes
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.imageURL = restaurant.imageURL;
    
};

//Methods
//Create New Restaurant
Restaurant.create = (newRestaurant, result) => {
    //INSERT INTO restaurant SET name, type, imageURL VALUES ("KFC", "Fastfood", "url")
    sql.query("INSERT INTO restaurant SET ?", newRestaurant, (err,res) => {

        //ถ้ามี error เกิดขึ้น
        if(err){
            console.log("err", err);
            result("err", null);
            return;
        }
        //ไม่มี error 
        console.log("New Restaurant Created...");
        result(null, {id:res.id, ...newRestaurant});
    });
}

//Get all Restaurant
Restaurant.getAll = (result) => {
    //SELECT * FROM restaurant
    sql.query("SELECT * FROM restaurant", (err,res)=>{
        if(err){
            console.log("err", err);
            result("err", null);
            return;
        }
        //ไม่มี error 
        console.log("get all restaurant...");
        result(null, res);
    })
}

//Get byID Restaurant
Restaurant.getByID = (restaurantid, result) => {
    //SELECT * FROM restaurant WHERE id = restaurantIid
    sql.query(
        `SELECT * FROM restaurant WHERE id = ${restaurantid}`,
        (err,res)=>{
            //ถ้ามี error
            if(err){
                console.log("err", err);
                result(err, null);
                return;
            }
            //ไม่มี error 
            console.log("Get restaurant By Id...");
            if (res.length) {
                console.log("hello");
                result(null, res[0])
                return;
            }
            result({kind:"not_found"}, null);
        })
}

//Update Restaurant byID
Restaurant.updateByid = (id, restaurant, result) =>{
    //UPDATE restaurant SET name, type, imageURL 
    sql.query("UPDATE restaurant SET name = ? ,type = ? ,imageURL = ? WHERE id = ?",
    [restaurant.name, restaurant.type, restaurant.imageURL, id],
    (err,res) => {
        if (err) {
            result(err,null);
            return;
        }
        if (res.affectedRows == 0) {
            result ({kind: "not_found"}, null)
            return;
        }
        result(null, {id: id, ...restaurant});
    });
};

//Delete Restaurant byID
Restaurant.delete = (restaurantid, result) =>{
    //DELETE FROM restaurant 
    sql.query (`DELETE FROM restaurant WHERE id = ${restaurantid}`,(err,res)=>{
        if(err){
                console.log("err", err);
                result(err, null);
                return;
            }
            //ไม่มี error 
            console.log("Delete restaurant...");
            if (res.length) {
                result(null, res[0])
                return;
            }
            result({kind:"not_found"}, null);
    })

}

module.exports = Restaurant;