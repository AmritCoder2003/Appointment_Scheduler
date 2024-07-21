import jwt from 'jsonwebtoken';
import user from "../models/user.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import appointment from '../models/appointment.js';
import {nanoid} from "nanoid";
import moment from 'moment';
dotenv.config();
export const createUser=async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {name,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({success:false,message:"Passwords do not match"});
    }
    let existingUser;
    try{
        existingUser=await user.findOne({email});
    }catch(err){
        return res.status(500).json({message:err});
    }
    if(existingUser){
        return res.status(400).json({success:false,message:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,12);
    const users=new user({
        name,
        email,
        password:hashedPassword,
    })

    try{
        await users.save();
        return res.status(201).json({success:true,message:"User created successfully"});
    }catch(err){
        return res.status(500).json({success:false,message:err});
    }

}

export const loginUser=async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await user.findOne({email});

    }
    catch(err){
        return res.status(500).json({message:err});
    }
    if(!existingUser){
        return res.status(404).json ({success:false,message:"User not found"});
    }
    const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({success:false,message:"Invalid credentials"});
    }
    console.log(token);
    return res.status(200).json({success:true,message:"Login successful",data:token});
}

export const userInfo=async (req,res)=>{
   try{
     if(!req.body.userId){
        return res.status(401).json({success:false,message:"Unauthorized"});
     }
     const userinfo=await user.findById(req.body.userId);
     if(!userinfo){
        return res.status(404).json({success:false,message:"User not found"});
     }
    //  console.log(userinfo);
     return res.status(200).json({success:true,message:"User found",userId:userinfo._id,isDoctor:userinfo.isDoctor,name:userinfo.name,email:userinfo.email,isAdmin:userinfo.isAdmin,noti:userinfo.unwatchednoti,seennoti:userinfo.watchednoti});
   }catch(err){
    console.log(err);
    return res.status(500).json({success:false,message:err});
   }
}

export const appointmentBooking = async (req, res) => {
    try {
        req.body.status = "pending";
        req.body.date=moment(req.body.date, 'YYYY-MM-DD').toISOString();
        req.body.time=moment(req.body.time, 'HH:mm').toISOString();

        const newAppointment= new appointment(req.body);
         await newAppointment.save();
        
        try {
            const id = req.body.doctorInfo.userId;
           

            const doctorfind = await user.findById(id);

            if (!doctorfind) {
                return res.status(404).json({ success: false, message: "Doctor not found" });
            }
            const notify=doctorfind.unwatchednoti;
            
            notify.push({
                id: nanoid(),
                type: "new-appointment-request",
                message: `${req.body.userInfo.name} has booked an appointment with you.`,
                onclickPath: "/doctor/appointments"
            });
           

            try {
                await doctorfind.save();
                return res.status(200).json({ success: true, message: "Appointment booked successfully" });
            } catch (saveErr) {
                return res.status(500).json({ success: false, message: "Failed to save notification: " + saveErr.message });
            }

        } catch (findErr) {
            return res.status(500).json({ success: false, message: "Failed to find doctor: " + findErr.message });
        }

    } catch (initialErr) {
        return res.status(500).json({ success: false, message: "Unexpected error: " + initialErr.message });
    }
};



export const checkAvailability = async (req, res) => {
    const doctorId = req.body.doctorId;
    console.log(doctorId);
    console.log(req.body.date);
    console.log(req.body.time);
    const date = moment(req.body.date, 'YYYY-MM-DD').toISOString();
    console.log(date);
    const fromtime=moment(req.body.time, 'HH:mm').subtract(30, 'minutes').toISOString();
    console.log(fromtime);
    const totime=moment(req.body.time, 'HH:mm').add(30, 'minutes').toISOString();
    console.log(totime);
    const appointments=await appointment.find({
        doctorId,
        date,
        time:{$gte:fromtime,$lte:totime},
    
    });
    console.log(appointments);
    if(appointments.length>0){
        return res.status(200).json({ success: false, message: "Appointment already booked" });
    }else{
        return res.status(200).json({ success: true, message: "Appointment available" });
    }
    

};


export const getAppointments = async (req, res) => {
    const userId = req.body.userId;
    try{
        const appointments=await appointment.find({userId});
        return res.status(200).json({success:true,data:appointments,message:"Appointments fetched successfully"});
    }catch(err){
        return res.status(500).json({success:false,message:err});
    }
}