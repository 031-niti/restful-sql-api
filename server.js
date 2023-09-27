const express = require("express");
const cors = require("cors");
const restaurantRoute = require("./routes/restaurant.route");
const db = require("./models/index")
const role = db.role

//dev mode
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and resync DB');
    initial();
})

function initial() {
    role.create({
        id : 1,
        name : "user",
    });
    role.create({
        id : 2,
        name : "admin",
    });
    role.create({
        id : 3,
        name : "moderator",
    });
}

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