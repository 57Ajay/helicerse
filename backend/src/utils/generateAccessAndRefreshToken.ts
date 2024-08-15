import ApiError from "./apiError";
import User from "../models/user.model";
import { Types } from "mongoose";

const generateAccessAndRefreshToken = async (userId: string | Types.ObjectId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
   
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new ApiError(`Something went wrong: ${error.message}`, 500);
  }
};

export default generateAccessAndRefreshToken;