import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    phoneNumber:{
        type : Number,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        enum : ["student","recruiter"]
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
       resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
        profilePhoto:{
            type:String,
            default:true
        }
    },

},{timestamps:true});
export const User = mongoose.model('User',userSchema); 