import mongoose, { Schema } from "mongoose";


const registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true
    },
    eventId:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    }
}, 
{timestamps: true}
)

export const Register = mongoose.model("Register", registerSchema)

