const express = require("express");
const cors = require("cors");
const restaurantRoute = require("./routes/restaurant.route")

const PORT = 5000;

//สร้าง service
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
    res.send("<h1>This is a restaurant API</h1>")
})

app.use("/", restaurantRoute);

app.listen(PORT, () => {
    console.log("Server is runing on http://localhost:" + PORT);
})