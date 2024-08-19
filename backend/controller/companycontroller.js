import { Company } from "../models/company.js";

export const registerCompany = async(req,res)=>{
    try{
        const {name,description,title,website,location}=req.body;
        console.log(req.body)
        if(!name || !description || !title || !website || !location){
            return res.status(400).json({
                message:"please fill up the required details",
                success:false
            });
        }
        let company = await Company.findOne({name:name})
        if(company){
            return res.status(400).json({
                message:"Company already exists",
                success:false
            });
        }
        company = await Company.create({
            name:name,
            description:description,
            title:title,
            website:website,
            location:location,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company created successfully",
            company,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const getCompany =async(req,res)=>{
    try{
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company found",
            companies,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

//get company by id
export const getCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message:"comapny not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"company found",
            company,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}

export const updateCompany=async(req,res)=>{
    try{
        const{name,description,title,website,location}=req.body
        const file =req.file

        const updateData={name,description,title,website,location}
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company details updated",
            company,
            success:true
        })
    }catch(error){
        console.log(error)
    }
}