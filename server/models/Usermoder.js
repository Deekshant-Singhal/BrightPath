import express from 'express';
import mongoose from 'mongoose';
import { user_structure } from './ModelStructure/UserStructure.js';









// Define the User schema
const userSchema = new mongoose.Schema(
   user_structure);




// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
