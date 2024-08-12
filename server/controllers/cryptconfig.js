import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.LEVELS_OF_CRYPT, 10);

export const hashed_Password = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error("An error occurred during password hashing.");
    }
};


export const compare_password = async (plain_password, hashed_Password) => {
    try {
        const match = await bcrypt.compare(plain_password, hashed_Password); 
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error("An error occurred during password comparison.");
    }
};
