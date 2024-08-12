import express from 'express';
import USER from '../../models/Usermoder.js';
import NGO from '../../models/Ngomodels.js';
import { user_structure } from '../../models/ModelStructure/UserStructure.js';




export const saveData = async (user) => {
  try {
    
    const chk = await USER.findOne({ userMail: user.userMail }); 
    if (chk) {
      console.log("User already exists");
      return;
    }

  
    const userType = user.userType;


    if (userType === "individual" || userType === "firm") {


        const newUser = new USER(user);
      await newUser.save();
     
      console.log("User dataa saved successfully");
      return true;


    } else if (userType === "ngo") {
     

      ;

     
      const newNGO = new NGO(user);
   const saved =   await newNGO.save();
      console.log("NGO data saved successfully");

    

     if(saved)
        
        { user.userType = 'firm';
      const newFirmUser = new USER(user);
      await newFirmUser.save();
      console.log("Temp registered as firm.");

      return true;
     }
     
     
     


    }
  } catch (error) {

    console.error(error);
    console.log("Error in saving data.");
    throw new Error("cant proceed");


   

  }
};

















