import jwt from 'jsonwebtoken';
import user from "../models/user.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
dotenv.config();
export const createUser=async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {name,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({message:"Passwords do not match"});
    }
    let existingUser;
    try{
        existingUser=await user.findOne({email});
    }catch(err){
        return res.status(500).json({message:err});
    }
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,12);
    const users=new user({
        name,
        email,
        password:hashedPassword,
    })

    try{
        await users.save();
        return res.status(201).json({message:"User created successfully"});
    }catch(err){
        return res.status(500).json({message:err});
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
        return res.status(404).json ({message:"User not found"});
    }
    const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }
    console.log(token);
    return res.status(200).json({message:"Login successful",data:token});
}

export const userInfo=async (req,res)=>{
   try{
     if(!req.body.userId){
        return res.status(401).json({message:"Unauthorized"});
     }
     const userinfo=await user.findById(req.body.userId);
     if(!userinfo){
        return res.status(404).json({message:"User not found"});
     }
     console.log(userinfo);
     return res.status(200).json({message:"User found",name:userinfo.name,email:userinfo.email});
   }catch(err){
    console.log(err);
    return res.status(500).json({message:err});
   }
}

