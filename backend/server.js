import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
dotenv.config({});
const app=express();

app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin :'http//localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
    res.send("node is running");
});
app.listen(3000,()=>{
    connectdb();
    console.log("node server is running on port 3000");
});

