import jwt from "jsonwebtoken"
import userModels from "../models/userModels.js";

// ✅ NEW: Admin authentication middleware
const adminAuth = async (req, res, next) => {
    const {token} = req.headers;
    
    if (!token) {
        return res.json({success: false, message: "Not Authorized - Admin Access Required"})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await userModels.findById(decoded.id);
        
        if (!user) {
            return res.json({success: false, message: "User not found"})
        }
        
        // Check if user is admin
        if (!user.isAdmin) {
            return res.json({success: false, message: "Admin privileges required"})
        }
        
        req.body.userId = decoded.id;
        req.body.isAdmin = true;
        next();
        
    } catch (error) {
        console.error("Admin auth error:", error);
        res.json({success: false, message: "Invalid or expired token"})
    }
}

export default adminAuth;