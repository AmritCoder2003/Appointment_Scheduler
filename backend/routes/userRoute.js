
import express from "express";
import {createUser,loginUser,getAppointments,userInfo,appointmentBooking,checkAvailability} from "../controllers/userController.js";
import {check} from "express-validator";
import { authMid } from "../auth/authMid.js";
const router=express.Router();

router.post("/register",[check("name","Name is required").notEmpty(),
check("email","Email is required").isEmail(),
check("password","Password must be at least 6 characters").isLength({min:6}),
check("confirmPassword","confirmPassword must be at least 6 characters").isLength({min:6}),
],createUser);

router.post("/login",[check("email","Email is required").isEmail(),
    check("password","Password is required and must be at least 6 characters").notEmpty().isLength({min:6}),
],loginUser);


router.post("/appointment-booking",authMid,appointmentBooking);


router.post("/userInfo",authMid,userInfo);

router.post("/check-availability",authMid,checkAvailability);

router.get("/getAppointments",authMid,getAppointments);

export default router