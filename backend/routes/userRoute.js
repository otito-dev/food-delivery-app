import express from "express"
import { loginUser, registerUser, verifyAdmin } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/verify-admin", verifyAdmin) // ✅ NEW: Verify admin endpoint

export default userRouter;