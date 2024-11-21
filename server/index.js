import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';

import UserRouter from "./routes/User.js";

dotenv.config();
const app= express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));


app.use("/api/user", UserRouter);

app.use("/api/feedback", UserRouter);


const ConnectDB=()=>{
    mongoose.set("strictQuery",true);
    mongoose.connect(process.env.MONGODB_URL)
    .then((res)=> console.log("Connected To MongoDB"))
    .catch((err)=>{
        console.log(err);
})
}

const startServer= async()=>{
    try{
        ConnectDB();
        app.listen(8080, ()=> console.log("your app is started"))
    }catch(err){
        console.log(err);
    }
}
startServer();