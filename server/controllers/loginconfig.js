import express from 'express';
import { generate_token } from '../utils/jwtUtils.js';
import { mock_compare, mock_look } from './mockfuncs.js';

export const login = async(req, res) => {
    const { userType, userMail, password } = req.body; 
   const plain_password = password;

    // db func
    const chk = await mock_look(userMail);

    if (!chk) {
        console.log("cant find such email");
        return res.status(404).json({ message: "Can't find a user with the specified email. Try again." });
    } else {
        


        try {

            // Authenticate the user

            const [authenticate_user,payload] = await mock_compare(userType, userMail, plain_password);

            if (authenticate_user === 1) {

                const token = generate_token(payload);
                console.log("Logged in success");
                return res.status(200).json({ token });
                


            } else if (authenticate_user === -1) {


                console.log("Wrong User Type.");
                return res.status(401).json({ message: "Incorrect UserType. Try again with a different type!" });


            } else {
                

                console.log("Wrong Password.");
                return res.status(401).json({ message: "Incorrect Password. Try again!" });


            }
        } catch (error) {
            console.error("Authentication error:", error);
            return res.status(500).json({ message: "An error occurred during authentication." });
        }
    }
};
