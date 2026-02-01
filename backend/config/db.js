import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Mortal:otitoboss555@cluster0.pdaevco.mongodb.net/PROJECT').then(()=>console.log("DB Connected"));
}