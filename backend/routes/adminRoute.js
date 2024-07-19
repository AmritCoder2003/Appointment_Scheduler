import express from "express";
import { getAllUsers,getAllDoctors,changeDoctorStatus } from "../controllers/adminController.js";

import { authMid } from "../auth/authMid.js";
const router = express.Router();

router.get("/getAllUsers",authMid,getAllUsers);

router.get("/getAllDoctors",authMid,getAllDoctors);

router.post("/changeDoctorStatus",authMid,changeDoctorStatus);

export default router;