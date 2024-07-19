import user from "../models/user.js";
import doctor from "../models/doctor.js";
import {nanoid} from "nanoid";
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.find({},'name email createdAt');
        return res.status(200).json( { success: true , message: "All users fetched successfully", users} );
    } catch (error) {
        return res.status(500).json({ message: error.message , success: false });
    }
}

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctor.find({},'userId firstName lastName email phoneNumber specialization address experience fee schedulefrom scheduleto createdAt status');
        return res.status(200).json( { success: true , message: "All doctors fetched successfully", doctors} );
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export const changeDoctorStatus = async (req, res) => {
    try {
       const {doctorId, status,useId} = req.body;
        //console.log(doctorId, status,useId);
       const doctorInfo=await doctor.findByIdAndUpdate(doctorId,{status});
       
    let updateUser;
   
    try {
       updateUser=await user.findById(useId);
        //console.log(updateUser);
    } catch (err) {
     
      return res.status(500).json({ success: false, message: "Error finding user: " + err.message });
    }
    
    if (!updateUser) {
      
      return res.status(404).json({ success: false, message: "user not found" });
    }
    
    try {
     
      const notify=updateUser.unwatchednoti;
      
      notify.push({
        id:nanoid(),
        type:"new-doctor-request-status-changed",
        message:`Your doctor account has been ${status}`,
        onclickPath:"/notification",
      })
      updateUser.isDoctor=true;
      await updateUser.save();
       console.log("hello");
      return res.status(200).json({ success: true, message: "Doctor status updated successfully" });
    } catch (err) {
      // console.log("hello");
      return res.status(500).json({ success: false, message: "Error updating notifications: " + err.message });
    }

    
    } catch (error) {
        return res.status(500).json({ message: error.message,success:false });
    }
    
}