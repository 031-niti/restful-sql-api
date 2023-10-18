const express = require ("express");
const router = express.Router();
const Restaurant = require ("../controllers/restaurant.con");
const authJwt = require("../middieware/auth.jwt");

//Create New Restaurant
//http://localhost:5000/restaurant
router.post("/restaurant",async (req,res)=>{
    try {
        const newRestaurant = req.body;
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        res.status(201).json(createRestaurant);
    } catch (error) {
        res.status(500).json({error:"failed to Create Restaurant"});
    }
})

//Get all Restaurant
//http://localhost:5000/restaurant
router.get("/restaurant", async (req,res) =>{
    try {
        const restaurants = await Restaurant.getAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({error:"failed to Get All Restaurant"});
    }
})

//Get ById Restaurant
//http://localhost:5000/restaurant/
router.get("/restaurant/:id",[authJwt.verifyToken], async (req,res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.getById(restaurantId);
        res.json(restaurant);
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(400).json("Restaurant not found")
        }else{
            res.status(500).json({error:"failed to get Restaurant data "});
        }
    }
})

//Update Restaurant byID
//http://localhost:5000/restaurant/
router.put("/restaurant/:id",[authJwt.verifyToken,authJwt.isAdmin], async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurantData = req.body;
        const updateRestaurant = await Restaurant.updateById(restaurantId, restaurantData)
        res.status(200).json(updateRestaurant);
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(400).json("Restaurant not found")
        }else{
            res.status(500).json({error:"failed to Update Restaurant data"});
        }
    }
})

//DELETE 
router.delete("/restaurant/:id",async (req,res)=>{
    try {
        const restaurantId = req.params.id;
        const isDeleted =await Restaurant.removeById(restaurantId);
        if (isDeleted) {
            res.status(200).json({message: "Restaurant ID " +restaurantId+ " is delete"});
        }
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(400).json("Restaurant not found")
        }else{
            res.status(500).json({error:"failed to delete Restaurant data"});
        }
    }
})
module.exports = router;