import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
    isAdmin: {type: Boolean, default: false}, 
    emailVerified: {type: Boolean, default: false}, 
    createdAt: {type: Date, default: Date.now},
    lastLogin: {type: Date}
}, {minimize: false})

userSchema.index({ email: 1 });
userSchema.index({ isAdmin: 1 });

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

const userModels = mongoose.models.user || mongoose.model("user", userSchema);

export default userModels;