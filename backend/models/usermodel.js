import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type : string,
        required : true
    },
    email:{
        type : string,
        required : true,
        unique : true
    },
    phoneNumber:{
        type : Number,
        required : true
    },
    password:{
        type : string,
        required : true
    },
    role:{
        type : string,
        required : true,
        enum : ["student","recruiter"]
    },
    profile:{
        bio:{type:string},
        skilss:[{type:string}],
        resume:{type:string},
        resumeOriginalName:{type:string},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
        profilePhoto:{
            type:string,
            default:true
        }
    },

},{timestamps:true});
export const User = mongoose.model('User',userSchema); 