const mongoose = require("mongoose")
const express = require("express")
require('dotenv').config()
const app = express();

mongoose.connect(process.env.DATABASE,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED");
})
const port = 8000;

app.listen(port,()=>{
    console.log(`app is running in port: ${port}`)
});