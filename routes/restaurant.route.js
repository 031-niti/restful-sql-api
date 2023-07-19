const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.models.sql");

//Insert restaurant to database
//http://localhost:5000/restaurant
router.post("/restaurant",(req,res)=>{
    //Create restaurant insert
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        imageURL: req.body.imageURL
    })

    //Insert to DB
    Restaurant.create(newRestaurant, (err, data)=>{
        if (err) {
            res.status(500).send({
                message:err.message || "some error occured while insering the new restaurant"
            })
        }else{
            res.send(data);
        }
    })

    //
});

//Get all Restaurant
//http://localhost:5000/restaurant
router.get("/restaurant",(req,res)=>{
    Restaurant.getAll((err,data)=>{
        if (err) {
            res.status(500).send({
                message:err.message || 
                "some error occured while insering the new restaurant"
            })
        }else{
            res.send(data);
        }
    })
});

//Get ById Restaurant
//http://localhost:5000/restaurant/
router.get("/restaurant/:id", (req,res)=>{
    const restaurantid = Number.parseInt(req.params.id);
    Restaurant.getByID(restaurantid, (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message:("Restaurant not found with this id " +restaurantid)
                })
            }else{
                res.status(500).send({
                message:err.message || 
                "some error occured while insering the new restaurant"
            });
            }
        }else{
            res.send(data);
        }
    })
});

//Update byID Restaurant 
//http://localhost:5000/restaurant/
router.put("/restaurant/:id",(req,res)=>{
     const restaurantid = Number.parseInt(req.params.id);
     if (req.body.constructor === Object && Object.keys(req.body).length ===0) {
        res.status(400).send({
            message:("Atrributes can not be empty ")
        })   
    }
    Restaurant.updateByid(restaurantid, new Restaurant(req.body), (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message:("Restaurant not found with this id " +restaurantid)
                });
            }else{
                res.status(500).send({
                message:err.message || 
                "some error occured while insering the new restaurant"
                })
            }
        }
    })
});

//Delete byID Restaurant 
//http://localhost:5000/restaurant/
router.delete("/restaurant/:id",(req,res)=>{
    const restaurantid = Number.parseInt(req.params.id);
    Restaurant.delete(restaurantid,(err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message:("Restaurant not found with this id " +restaurantid)
                })
            }else{
                res.status(500).send({
                message:err.message || 
                "some error occured while insering the new restaurant"
            });
            }
        }else{
            res.send({
                message:("Restaurant id " +restaurantid+ "is delete")
            });
        }
    })
});

module.exports = router;