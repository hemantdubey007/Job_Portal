import mongoose from "mongoose";

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.mongodb_url);
        console.log("mongodb connected");
    }
     catch(error){
        console.log(error);
    }
}
export default connectdb;

