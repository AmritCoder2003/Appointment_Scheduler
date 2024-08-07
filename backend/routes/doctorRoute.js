import express from "express";
import { createDoc,approvedAppointment,deleteAppointment,markSeen,getDoctorById,deleteAll,doctorInfo,doctorUpdate,approvedDoctor,getAppointments } from "../controllers/doctorController.js";
import { check } from "express-validator";
import { authMid } from "../auth/authMid.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("userId", "User Id is required").notEmpty(),
    check("firstName", "First Name is required").notEmpty(),
    check("lastName", "Last Name is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("phoneNumber", "Phone Number is required").notEmpty(),
    check("address", "Address is required").notEmpty(),
    check("specialization", "Specialization is required").notEmpty(),
    check("experience", "Experience is required").notEmpty(),
    check("fee", "Fee is required").notEmpty(),
    check("schedulefrom", "Schedule From is required").notEmpty(),
    check("scheduleto", "Schedule To is required").notEmpty(),
  ],
  authMid,
  createDoc
);

router.post("/doctorinfo", authMid,doctorInfo);
router.patch("/update",[check("fee","Fee is required").notEmpty(),
  check("address","Address is required").notEmpty(),
  check("experience","Experience is required").notEmpty(),
  check("schedulefrom","Schedule From is required").notEmpty(),
  check("scheduleto","Schedule To is required").notEmpty(),

],authMid,doctorUpdate);

router.get("/profile/:id",authMid,getDoctorById);

router.get("/approved-doctor",authMid,approvedDoctor);
router.post("/markAllAsSeen",authMid,markSeen);
router.post("/deleteNotification",authMid,deleteAll);
router.get("/getAppointments",authMid,getAppointments);

router.post("/approveAppointment/:id",authMid,approvedAppointment);



router.delete("/deleteAppointment/:id",authMid,deleteAppointment);
export default router;
