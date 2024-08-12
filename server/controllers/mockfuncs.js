import User from '../models/Usermoder.js'; 
import { compare_password } from './cryptconfig.js';

export const mock_look = async (userMail) => {
    try {
        console.log("Starting search for userMail:", userMail);
        const user = await User.findOne({ userMail: userMail });
      
        return user!=null;
    } catch (error) {
        console.error("Error in mock_look:", error);
        throw new Error("Database error");
    }
};

export const mock_compare = async (userType, userMail, plain_password) => {
    try {
        const user = await User.findOne({ userMail: userMail });

        if (!user) {
            return [0, null]; // User not found
        }

        const passwordMatch = await compare_password(plain_password, user.password);
        const userTypeMatch = userType === user.userType;

        if (passwordMatch && userTypeMatch) {
            const payload = {
                userId: user.userId,
                user
            };
            return [1, payload]; // Successful authentication
        } else if (!userTypeMatch && passwordMatch) {
            return [-1, null]; // Incorrect user type
        } else {
            return [0, null]; // Incorrect password
        }
    } catch (error) {
        console.error("Error in mock_compare:", error);
        throw new Error("Database error");
    }
};
