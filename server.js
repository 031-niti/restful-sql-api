const express = require('express');
const cors = require('cors');
const sql = require('./models/db');
const PORT = 5000;

//สร้าง service
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req,res)=>{
    res.send("<h1>This is the restaurant API</h1>");
})

app.listen(PORT, ()=> {
    console.log("Server is running on http://locahost:" +PORT);
})