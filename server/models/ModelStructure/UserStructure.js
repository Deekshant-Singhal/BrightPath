export const user_structure = {
    


    userId: {
        type: String,
        required: true,
        unique:true
       
    },

    
    fullName : {
        type:String,
        required : true
    }


    ,
   



    userMail: {
        type: String,
        required: true,
        unique: true
    },



    password: {
        type: String,
        required: true
    },



    userType: {
        type: String,
        enum: ['individual', 'firm', 'ngo'], 
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }



}