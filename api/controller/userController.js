import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";





export const createUser = asyncHandler(async(req,res,next)=>{
const {name,password,email} = req.body;

if (!name || !password || !email) {
    throw new Error("Please fill all fields")
}
const existedUser = await User.findOne({email})
if (existedUser) res.status(400).json({message : "User already exits"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({name,email,password:hashedPassword})
    try {
        newUser.save()
        createToken(res,newUser._id)
        res.status(200).json({
            _id : newUser._id,
            email : newUser.email,
            name : newUser.name,
            password:newUser.password
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

export const login = asyncHandler(async(req,res,next)=>{
    const {email, password} = req.body;
    const existedUser = await User.findOne({email})
    if (existedUser) {
        const isPasswordValid = await bcrypt.compare(password, existedUser.password)
        if (isPasswordValid) {
            createToken(res, existedUser._id)
            res.status(200).json({
                _id : existedUser._id,
                name : existedUser.name,
                email : existedUser.email,
               isAdmin : existedUser.isAdmin
            })
            return
        }
    }
})

export const logout = asyncHandler(async(req,res,next)=>{
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message : "Logout succefully"})
})

export const getAllUsers = asyncHandler(async(req,res,next)=>{
    const users = await User.find({})
    res.status(200).json(users)
})

export const getUserDetails = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    }else{
        res.status(400)
        throw new Error("User not found")
    }
})

export const updateCurrentUserProfile = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
    
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword
    }
    const updatedUser = await user.save()
    res.status(200).json({
        _id : updatedUser._id,
        name : updatedUser.name,
        email : updatedUser.email,
        isAdmin : updatedUser.isAdmin
    })
}else{
    res.status(400)
    throw new Error("User not found")
}
}
)

 export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannot delete admin user");
      }
  
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  });

 export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
 export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  // Forgot Password
  export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "If your email is in our system, you'll receive a password reset link within 5 minutes." });
    }

    try {
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 300000; // 5 minutes (300,000 ms)
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 5 minutes.</p>`
        });

        res.json({ message: "If your email is in our system, you'll receive a password reset link within 5 minutes." });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: "Failed to send reset email" });
    }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    });
    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired token");
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.json({ message: "Password reset successful. Please log in." });
});