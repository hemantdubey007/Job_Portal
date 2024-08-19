import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        status: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already exist",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      message: "accont created succesfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        status: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
        status: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid email or password",
        status: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "account doesnt match with current role",
        status: false,
      });
    }
    const tokendata = {
      userId: user.id
    };
    const token = await jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: "1d" });
    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000,httpsOnly: true,sameSite: true,}).json({
        message: `welcome back ${user.fullname}`,
        status: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async(req,res)=>{
try{
return res.status(200).cookie("token","",{maxAge:0}).json({
    message: "logged out successfully",
    status: true,
})
}catch(error){
console.log(error)
}
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log(req.body);
    const file = req.file;
    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    console.log(userId);
    let user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully",
      user,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      status: false,
    });
  }
};
