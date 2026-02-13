import userModels from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModels.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        const token = createToken(user._id)
        
        // ✅ Update last login
        user.lastLogin = new Date();
        await user.save();
        
        res.json({success:true,token});

    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // checking is user exist already
        const exists = await userModels.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})  
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }

        // ✅ IMPROVED: Better password validation
        if (password.length < 8) {
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }

        // Optional: Add stronger password requirements
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            return res.json({
                success:false,
                message:"Password must contain uppercase, lowercase, and number"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModels({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// ✅ NEW: Verify if user is admin
const verifyAdmin = async (req, res) => {
    try {
        const {token} = req.headers;
        
        if (!token) {
            return res.json({success: false, message: "No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModels.findById(decoded.id);

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }

        if (!user.isAdmin) {
            return res.json({success: false, message: "Not an admin", isAdmin: false})
        }

        res.json({
            success: true, 
            isAdmin: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error("Verify admin error:", error);
        res.json({success: false, message: "Invalid or expired token"})
    }
}

export {loginUser, registerUser, verifyAdmin}