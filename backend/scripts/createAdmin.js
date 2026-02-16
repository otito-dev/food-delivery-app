import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModels from '../models/userModels.js';
import 'dotenv/config';

const createAdmin = async () => {
    try {
        console.log("🔧 Admin Account Setup");
        console.log("📡 Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected successfully\n");

        const adminData = {
            name: process.env.ADMIN_NAME || "Admin",
            email: process.env.ADMIN_EMAIL || "admin@example.com",
            password: process.env.ADMIN_PASSWORD || "Admin123",
        };

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.log("⚠️  WARNING: Using default credentials! Set ADMIN_EMAIL and ADMIN_PASSWORD in .env file\n");
        }

        const existingUser = await userModels.findOne({ email: adminData.email });
        
        if (existingUser) {
            if (existingUser.isAdmin) {
                console.log("✓ User already exists and is an admin");
                console.log(`📧 Email: ${adminData.email}\n`);
            } else {
                console.log("🔄 Upgrading existing user to admin...");
                existingUser.isAdmin = true;
                existingUser.emailVerified = true;
                await existingUser.save();
                console.log("✅ User upgraded to admin successfully!");
                console.log(`📧 Email: ${adminData.email}\n`);
            }
        } else {
            console.log("👤 Creating new admin user...");
            
            const hashedPassword = await bcrypt.hash(adminData.password, 10);
            
            await userModels.create({
                name: adminData.name,
                email: adminData.email,
                password: hashedPassword,
                isAdmin: true,
                emailVerified: true,
                cartData: {},
                createdAt: new Date()
            });

            console.log("✅ Admin account created successfully!");
            console.log("\nLOGIN CREDENTIALS:");
            console.log(`📧 Email: ${adminData.email}`);
            console.log(`🔑 Password: ${adminData.password}\n`);
        }

        console.log("🎉 Setup complete!");
        
        await mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
        console.error("Check: Database connection, .env file, or user model\n");
        process.exit(1);
    }
};

createAdmin();