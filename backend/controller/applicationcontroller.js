import { Job } from "../models/jobmodel.js";
import { Application } from "../models/application.js";

export const applyJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job id is required",
                success:false
            });
        }
        const existingApplication = await Application.findOne({job:jobId,application:userId})
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success:false
            })
        }
        //check if job exist or not
        const job = await Job.findOne({_id:jobId});
        if (!job) {
            return res.status(400).json({
                message: "Job does not exist",
                success: false
            });
        }
        
        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message: "Application submitted successfully",
            success:true
        })

        
    }catch(error){
        console.log(error)
    }
}

export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })
        if(!application){
            return res.status(400).json({
                message: "No jobs applied",
                success:false
            })
        }
        return res.status(200).json({
            message: "Jobs applied successfully",
            application,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}
export const getApplicants = async(req,res)=>{
    try{
         const jobId = req.params.id;
         const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                options:{sort:{createdAt:-1}},
            }
         })
         if(!job){
            return res.status(400).json({
                message: "No job found",
                success:false
            })
         }
         return res.status(200).json({
            message: "job found",
            job,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

export const updateStatus = async(req,res)=>{
    try{
        const {status}=req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success:false
            })
        }
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(400).json({
                message: "application not found",
                success:false
            })
        }
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated succesfully",
            success:true
        })
    }catch(error){

    }
}