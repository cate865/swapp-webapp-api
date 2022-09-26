import express from 'express';
import dotenv from 'dotenv';
import pkg from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const {connect,connection} = pkg;

const app = express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = "3000" || "3001";

app.use(router)

// Database connection

// eslint-disable-next-line no-undef
const uri = process.env.DATABASE_URL_PROD;


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

export default app