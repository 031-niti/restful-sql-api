const Restaurant = require ("../models/restaurant.models");

//insert data
Restaurant.createRestaurant = async(newRestaurant) =>{
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("created restaurant: ", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}



module.exports = Restaurant;