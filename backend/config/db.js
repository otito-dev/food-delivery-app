import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📍 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        console.error("Stack:", err.stack);
        
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.log("⚠️ Development mode: Continuing without database");
        }
    }
}