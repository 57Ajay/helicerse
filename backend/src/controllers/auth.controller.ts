import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken";

export const registerUser = asyncHandler(async(req, res)=>{
    
    const loggedInUser = req.user;
    const { email, password, role } = req.body;
    if (loggedInUser.role === "Principal"){
        if (role === "Principal"){
            throw new ApiError("You are already a principal", 400)
        };

        if (!email || !password || !role) {
            throw new ApiError("All fields are required", 400)
        };

        const user = await User.findOne({ email });
        if (user) {
            throw new ApiError("User already exists", 400);
        };

        const newUser = new User({ email, password, role });
        await newUser.save();
        return res.status(201).json(
            new ApiResponse("User created successfully", {
                _id: newUser._id,
                email, role
            }, 201)
        )
    }else if (loggedInUser.role === "Teacher"){
        if (!email || !password || !role) {
            throw new ApiError("All fields are required", 400)
        };

        if (role !== "Student"){
            throw new ApiError("Role must be Student", 400)
        };
        
        const newUser = new User({ email, password, role });
        await newUser.save();
        return res.status(201).json(
            new ApiResponse("User created successfully", {
                _id: newUser._id,
                email, role
            }, 201)
        )
    }else{
        throw new ApiError("You are not authorized to perform this action", 401);
    };
});

export const loginUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError("All fields are required", 400)
    };

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError("User not found", 404);
    };

    const isPasswordMatched = await user.isPasswordMatched(password);
    if (!isPasswordMatched) {
        throw new ApiError("Invalid credentials", 401);
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res.status(200).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000
    }).json(
        new ApiResponse("User logged in successfully", {
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                refreshToken,
            }
        }, 200)
    );
});

export const logoutUser = asyncHandler(async(req, res)=>{
    const user = req.user;
    if (!user){
        throw new ApiError("User not found", 404);
    };

    const userTologout = await User.findById(user._id);
    if (!userTologout) {
        throw new ApiError("User not found", 404);
    };

    userTologout.refreshToken = "";
    await userTologout.save();

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).json(
        new ApiResponse("User logged out successfully", {}, 200)
    );
});