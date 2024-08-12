
import { user_structure } from "./UserStructure.js"

export const ngo_Structure = {

requestId :{
    type: String,
    required:true,
    unique:true
},

userId: user_structure.userId,
    fullName: user_structure.fullName,
    userMail: user_structure.userMail,
    password: user_structure.password,
    userType: user_structure.userType,
    createdAt: user_structure.createdAt,

imgUrl: { type: String, required: true }



}