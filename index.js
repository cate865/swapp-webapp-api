import express from 'express';
const app = express();

const port = "3000" || "3001";

app.get("/", (req,res)=>{
    res.send("Welcome to Swapp Web API");
})

app.listen(port, ()=>{
    console.log(`Swapp Web API is running on port ${port}`);
})
