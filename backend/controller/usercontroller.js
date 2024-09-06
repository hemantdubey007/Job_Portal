import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Configure multer for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Adjust path as needed
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(req.body);
    console.log(req.file); // Log the uploaded file if any

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        status: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already exists",
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
      profile: req.file ? { profilePhoto: req.file.path } : {},
    });

    return res.status(200).json({
      message: "account created successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while creating the account",
      status: false,
    });
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

    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't match with current role",
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

    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    }).json({
      message: `welcome back ${user.fullname}`,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while logging in",
      status: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while logging out",
      status: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log(req.body);
    const file = req.file;
    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.userId; // Assuming you're using a middleware to set req.userId
    let user = await User.findById(userId);
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
    if (file) user.profile.profilePhoto = file.path;

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
