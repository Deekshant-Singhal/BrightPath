import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGO = process.env.JWT_ALGO;
const JWT_TIME = process.env.JWT_TIME;



export const generate_token = (payload) => {
    const options = {
        expiresIn: JWT_TIME,
        issuer: "BRIGHT_PATH",
        audience: "userType",
        subject: "Primarily login token stream",
        algorithm: JWT_ALGO 
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verify_Token = (req, res, next) => {
    if (!JWT_SECRET) {
        console.error("Secret key is not set in the environment variables.");
        return res.status(500).json({ message: "Server error." });
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. Token not provided." });
    }

    const options = {
        algorithms: [JWT_ALGO], 
        issuer: "BRIGHT_PATH",
        audience: "userType",
        subject: "Primarily login token stream"
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET, options);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ message: "Auth failed. Invalid or expired token." });
    }
};
