const express = require ("express");
const router = express.Router();
const Restaurant = require ("../controllers/restaurant.con");

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
router.get("/restaurant",async (req,res)=>{
    
})

//Get ById Restaurant
//http://localhost:5000/restaurant/

module.exports = router;