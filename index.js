import express from 'express';
import dotenv from 'dotenv';
import pkg from 'mongoose';
const {connect,connection} = pkg;

const app = express();
dotenv.config()

const port = "3000" || "3001";

// Database connection

// eslint-disable-next-line no-undef
const uri = process.env.DATABASE_URL;


connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,},() => {
  console.log('Connected to DB');
});

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get("/", (req,res)=>{
    res.send("Welcome to Swapp Web API");
})

app.listen(port, ()=>{
    console.log(`Swapp Web API is running on port ${port}`);
})
