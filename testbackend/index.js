const express = require('express')
const app = express()

const port = 8000

app.get('/', (req, res)=>{
    return res.send("Got the GEeeeT request");
})

app.listen(port, ()=>{
    console.log("server is running")
})