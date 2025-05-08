import express from "express";
import { createUser, deleteUserById,forgotPassword,getAllUsers, getUserById, getUserDetails, login, logout, resetPassword, updateCurrentUserProfile, updateUserById } from "../controller/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(createUser)
router.route("/").get(authenticate, authorizeAdmin,getAllUsers)
router.route("/login").post(login)
router.route("/logout").post(authenticate,logout)
router.route("/profile").get(authenticate,getUserDetails)
.put(authenticate,updateCurrentUserProfile)
router.route("/:id")
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

  // Forgot/Reset password routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router