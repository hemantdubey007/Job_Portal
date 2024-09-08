import { Job } from "../models/jobmodel.js"

export const jobPost = async(req,res)=>{
    try{
    const {title,description,requirements,salary,experience,location,jobType,position,companyId}=req.body
    const userId = req.id
     if(!title||!description||!requirements||!salary||!experience||!location||!jobType||!position||!companyId){
        return res.status(400).json({
            message: "Please fill in all fields.",
            success:false
        })
     }
     const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        experience,
        location,
        jobType,
        position,
        company:companyId,
        created_by:userId

     })
     return res.status(200).json({
        message: "Job created",
        job,
        success:true
     })
    }catch(error){
        console.log(error)
    }
}

export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(400).json({
                message: "No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message: "jobs found",
            jobs,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const getJobById=async(req,res)=>{
    try{
        const jobId = req.params.id
        const jobs = await Job.findById(jobId)
        if(!jobs){
            return res.status(400).json({
                message: "Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message: "Job found",
            jobs,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const getAdminJob=async(req,res)=>{
    try{
        const adminId = req.id
        const jobs = await Job.find({created_by:adminId})
        if(!jobs){
            return res.status(400).json({
                message: "No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message: "Jobs found",
            jobs,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}