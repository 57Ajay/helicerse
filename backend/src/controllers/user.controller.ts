import Classroom from "../models/classroom.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import User from "../models/user.model";
import bcrypt from 'bcrypt';
import { IUser } from "../models/user.model";

export const updateUser = asyncHandler(async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal") {
            throw new ApiError("You are not authorized to perform this action", 404);
        }

        const { userId, email, password } = req.body;
        if (!userId) {
            throw new ApiError("userId is required", 400);
        }
        if (!email && !password) {
            throw new ApiError("email or password, any one is required", 400);
        }

        let hashedPassword: string | undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateData: Partial<IUser> = { email };
        if (hashedPassword) {
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        return res.status(200).json(
            new ApiResponse("User updated successfully", {
                email: user.email,
                role: user.role,
                _id: user._id
            }, 200)
        );
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500);
    }
});


export const deleteUser = asyncHandler(async(req, res)=>{
    
    try {
        const loggedInUser = req.user;
        if (loggedInUser.role !== "Principal"){
            throw new ApiError("You are not authorized to perform this action", 404);
        }; 
    
        const { userId } = req.body;
        if (!userId) {
            throw new ApiError("All fields are required", 400)
        };
    
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        
        return res.status(200).json(
            new ApiResponse("User deleted successfully", null, 200));
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500)
    };
});


export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const loggedInUser = req.user;
    
        if (loggedInUser.role !== "Principal") {
            throw new ApiError("You are not authorized to perform this action", 403);
        }
    
        const allUsers = await User.find({ 
            role: { $in: ["Teacher", "Student"] } 
        }).select('-password -refreshToken');
    
        if (!allUsers.length) {
            return res.status(200).json(
                new ApiResponse("No users found", [], 200)
            );
        }
    
        return res.status(200).json(
            new ApiResponse("Users fetched successfully", allUsers, 200)
        );
    } catch (error) {
        console.log(error.message);
        throw new ApiError("Something went wrong", 500);
    }
});

