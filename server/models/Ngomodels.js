import express from 'express';
import mongoose from 'mongoose';
import { ngo_Structure } from './ModelStructure/ngoStructure.js';






const NGO_schema = new mongoose.Schema(
ngo_Structure
);

const NGO = mongoose.model('NGO', NGO_schema);

export default NGO;
