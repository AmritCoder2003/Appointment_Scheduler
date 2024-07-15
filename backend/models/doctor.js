import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    schedulefrom:{
        type:String,
        required:true
    },
    scheduleto:{
        type:String,
        required:true
    }


},{
    timestamps:true
});

export default mongoose.model("Doctor",doctorSchema);