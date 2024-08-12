import express from 'express';
import { generate_token } from '../utils/jwtUtils.js';
import { mock_look, mock_compare } from './mockfuncs.js';
import { saveData } from './dbControllers/userAuthController.js';
import { hashed_Password } from './cryptconfig.js';

export const register = async (req, res) => {
    const user = req.body;

    const {userMail,password} = user;

    if (!user || !user.userMail || !user.password || !user.userId) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

 ;


    //db func
    let chk = await mock_look(userMail);

    if (chk === true) {
        console.log("User exists");
        return res.status(401).json({ message: "User already exists. Try again." });
    }
    
    else{

    try {
        

    //db func
            user.password = await hashed_Password(password);

    const saved =   await saveData(user);

        

        
           
          
         console.log(`User info saved successfully. Generating token`);
                const token = generate_token(user); 

            return res.status(201).json({ token });
          

        
            
        
    } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ message: "An error occurred during registration." }); 
    }

}
};
