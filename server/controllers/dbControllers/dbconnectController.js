import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.DB_URL;

export const CONNECT = async ()=>{
    await mongoose.connect(dbURL);

    try {
        console.log("MONGO Connection Successful");
    } 
        catch (error) {
            console.error(error);
        }
        
    

}

