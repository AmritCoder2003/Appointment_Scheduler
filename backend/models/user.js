import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    watchednoti: {
        type: Array,
        default: []
    },
    unwatchednoti: {
        type: Array,
        default: []
    }
    
},
{timestamps:true});

export default mongoose.model("User",userSchema);
