import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongodbUrl = process.env.MONGODBURL;

export const dbConnection =()=>{
    mongoose.connect("mongodb+srv://amrit2003btech:YEEp7s5tYC3GrkW@cluster0.kxp1pnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{

        dbName:"Appointment_Scheduler"
    })
    .then(()=>{
        console.log("MongoDB Connected!")
    })
    .catch((err)=>{
        console.log(err)
    })
}