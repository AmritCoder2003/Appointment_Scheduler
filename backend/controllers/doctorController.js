import doctor from "../models/doctor.js";
import user from "../models/user.js";
import appointment from "../models/appointment.js";
import { validationResult } from "express-validator";
import {nanoid} from "nanoid";
export const createDoc = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log('Validation errors:', errors.array());
    return res.status(422).json({ errors: errors.array() });
  }

  const newdoctor = new doctor({
    ...req.body,
    status: "pending"
  });

  try {
    await newdoctor.save();
    // console.log('Doctor saved successfully:', newdoctor);
  } catch (err) {
    console.error('Error saving doctor:', err);
    return res.status(500).json({ success: false, message: err });
  }

  let adminUser;
  try {
    adminUser = await user.findOne({ isAdmin: true });
    if (!adminUser) {
      // console.error('No admin user found');
      return res.status(500).json({ message: "No admin user found", success: false });
    }
    console.log('Admin user found:', adminUser);
  } catch (err) {
    // console.error('Error finding admin user:', err);
    return res.status(500).json({ message: err });
  }

  const newNotification = {
    id: nanoid(),
    type: "new-doctor-request",
    message: `A new doctor request is pending for approval. Dr.${newdoctor.firstName} ${newdoctor.lastName}`,
    data: {
      doctorId: newdoctor._id,
      name: `${newdoctor.firstName} ${newdoctor.lastName}`,
    },
    onClickPath: "/doctors"
  };

  try {
    await user.findByIdAndUpdate(
      adminUser._id,
      { $push: { unwatchednoti: newNotification } },
      { new: true }
    );
    // console.log('Notification updated successfully');
    return res.status(201).json({ success: true, message: "Doctor account applied successfully" });
  } catch (err) {
    // console.error('Error updating notification:', err);
    return res.status(500).json({ message: err, success: false });
  }
};

export const markSeen = async (req, res) => {
  try {
    const id = req.body.userId;
    // console.log(id);
    let updateUser;
   
    try {
       updateUser=await user.findById(req.body.userId);
      
    } catch (err) {
     
      return res.status(500).json({ success: false, message: "Error finding user: " + err.message });
    }
    
    if (!updateUser) {
      
      return res.status(404).json({ success: false, message: "user not found" });
    }
    
    try {
     
      updateUser.watchednoti.push(...updateUser.unwatchednoti);
      updateUser.unwatchednoti = [];
      await updateUser.save();
    } catch (err) {
      // console.log("hello");
      return res.status(500).json({ success: false, message: "Error updating notifications: " + err.message });
    }

    let userinfo;
    try {
      userinfo = await user.findById(req.body.userId);
      // console.log(userinfo);
    } catch (err) {
      
      return res.status(500).json({ success: false, message: "Error fetching updated user info: " + err.message });
    }

    return res.status(200).json({
      success: true,
      message: "All notifications marked as seen",
      userId: userinfo._id,
      name: userinfo.name,
      email: userinfo.email,
      isAdmin: userinfo.isAdmin,
      noti: userinfo.unwatchednoti,
      seennoti: userinfo.watchednoti,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteAll = async (req, res) => {
  try {
    let updateUser;
    
    // Try to find the updateUser
    try {
      updateUser = await user.findById(req.body.userId); // Ensure you import the user model correctly
    } catch (err) {
      return res.status(500).json({ success: false, message: "Error finding updateUser: " + err.message });
    }

    if (!updateUser) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    // Try to clear notifications
    try {
      updateUser.watchednoti = [];
      await updateUser.save();
    } catch (err) {
      return res.status(500).json({ success: false, message: "Error updating notifications: " + err.message });
    }

    let userinfo;

    // Try to fetch the updated updateUser info
    try {
      userinfo = await user.findById(req.body.userId);
    } catch (err) {
      return res.status(500).json({ success: false, message: "Error fetching updated user info: " + err.message });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications deleted",
      userId: userinfo._id,
      name: userinfo.name,
      email: userinfo.email,
      isAdmin: userinfo.isAdmin,
      noti: userinfo.unwatchednoti,
      seennoti: userinfo.watchednoti,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const doctorInfo = async (req, res) => {
  try {
    const doctorId=req.body.userId;
    //console.log(doctorId);
    if (!doctorId) {
       console.log("hello");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const doctorInfo = await doctor.findOne({userId: doctorId});
    //console.log(doctorInfo);
    if (!doctorInfo) {
      console.log("hello2");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // console.log(doctorInfo);
    return res.status(200).json({ success: true, data:doctorInfo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }

}


export const doctorUpdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const doctorId = req.body.userId;
    if (!doctorId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const doctorInfo = await doctor.findOne({ userId: doctorId });
    if (!doctorInfo) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updatedDoctor = await doctor.findOneAndUpdate(
      { userId: doctorId },
      {$set: { ...req.body }},
      { new: true }
      
    );
    return res.status(200).json({ success: true, data: updatedDoctor });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }



}

export const approvedDoctor = async (req, res) => {
  try{
    const doctors=await doctor.find({status:"Approved"});
    return res.status(200).json({success:true,data:doctors,message:"Approved doctor fetched successfully"});
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const getDoctorById= async (req, res) => {
  const params= req.params.id;

  try{
    const doctorData=await doctor.findOne({_id:params});
    return res.status(200).json({success:true,data:doctorData,message:"Doctor fetched successfully"});
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}
export const getAppointments = async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  try {
      // Find the doctor associated with the userId
      const doc = await doctor.findOne({ userId });
      
      // Check if the doctor was found
      if (!doc) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
      }

      //console.log(doc);
      
      // Find the appointments for the doctor
      const appointments = await appointment.find({ doctorId: doc._id });
      
      //console.log(appointments);
      return res.status(200).json({ success: true, data: appointments, message: "Appointments fetched successfully" });
  } catch (err) {
      return res.status(500).json({ success: false, message: err });
  }
}

export const approvedAppointment = async (req, res) => {
  try{
     const params=req.params.id;
     let appointmentData;
     let notify;
     try{
      appointmentData=await appointment.findOne({_id:params});
    
     appointmentData.status="Approved";
     appointmentData.save();
     }
     catch(err){
       return res.status(500).json({success:false,message:err.message});
     }
     try{
     const userId=appointmentData.userId;

     const userInfo=await user.findOne({_id:userId});
      notify=userInfo.unwatchednoti;
     notify.push({
       id:nanoid(),
       type:"new-appointment-request-status-changed",
       message:`Your appointment has been approved`,
       onclickPath:"/notification"
     });
     await userInfo.save();
    
    }catch(err){
      return res.status(500).json({success:false,message:err.message});
    }
   return res.status(200).json({success:true,data:appointmentData,message:"Appointment approved successfully"});
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const deleteAppointment = async (req, res) => {
  try{
    const params=req.params.id;
    let appointmentData;
    let notify;
    try{
     appointmentData=await appointment.findOne({_id:params});
   
    appointmentData.status="Rejected";
    
    appointmentData.save();

    }
    catch(err){
      return res.status(500).json({success:false,message:err.message});
    }
    try{
    const userId=appointmentData.userId;

    const userInfo=await user.findOne({_id:userId});
     notify=userInfo.unwatchednoti;
    notify.push({
      id:nanoid(),
      type:"new-appointment-request-status-changed",
      message:`Your appointment has been Rejected`,
      onclickPath:"/notification"
    });
    await userInfo.save();
    appointmentData=await appointment.deleteOne({_id:params});
    

   }catch(err){
     return res.status(500).json({success:false,message:err.message});
   }
  return res.status(200).json({success:true,data:appointmentData,message:"Appointment deleted successfully"});
 }catch(err){
   return res.status(500).json({success:false,message:err.message});
 }
}