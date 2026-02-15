import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModels from '../models/userModels.js';
import 'dotenv/config';

const createAdmin = async () => {
    try {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔧 Admin Account Setup");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("");

        console.log("📡 Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected successfully");
        console.log("");

        const adminData = {
            name: process.env.ADMIN_NAME || "Admin",
            email: process.env.ADMIN_EMAIL || "admin@example.com",
            password: process.env.ADMIN_PASSWORD || "Admin123",
        };

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.log("⚠️  WARNING: Using default credentials!");
            console.log("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env file");
            console.log("");
        }

        console.log(`🔍 Checking if ${adminData.email} exists...`);
        const existingUser = await userModels.findOne({ email: adminData.email });
        
        if (existingUser) {
            console.log("⚠️  User already exists");
            
            if (existingUser.isAdmin) {
                console.log("✓ User is already an admin");
                console.log("");
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("📧 Email:", adminData.email);
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("");
                console.log("ℹ️  If you forgot your password, update it in MongoDB");
            } else {
                console.log("🔄 Upgrading user to admin...");
                existingUser.isAdmin = true;
                existingUser.emailVerified = true;
                await existingUser.save();
                console.log("✅ User upgraded to admin successfully!");
                console.log("");
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("📧 Email:", adminData.email);
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("");
            }
        } else {
            console.log("👤 Creating new admin user...");
            
            const hashedPassword = await bcrypt.hash(adminData.password, 10);
            
            const admin = await userModels.create({
                name: adminData.name,
                email: adminData.email,
                password: hashedPassword,
                isAdmin: true,
                emailVerified: true,
                cartData: {},
                createdAt: new Date()
            });

            console.log("✅ Admin account created successfully!");
            console.log("");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("LOGIN CREDENTIALS");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("📧 Email:    ", adminData.email);
            console.log("🔑 Password: ", adminData.password);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("");
            console.log("⚠️  IMPORTANT SECURITY NOTES:");
            console.log("1. Save these credentials in a secure location");
            console.log("2. Change the password after first login");
            console.log("3. Never share these credentials");
            console.log("4. Use a password manager");
            console.log("");
        }

        console.log("🎉 Setup complete!");
        console.log("");
        
        await mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        console.error("");
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ ERROR");
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error(error);
        console.error("");
        console.error("Possible issues:");
        console.error("1. Database connection failed - check MONGODB_URI");
        console.error("2. User model not found - check imports");
        console.error("3. Validation error - check user schema");
        console.error("4. Missing environment variables - check .env file");
        console.error("");
        
        process.exit(1);
    }
};

createAdmin();