import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import ApiError from "../utils/apiError";
import User from "../models/user.model";

config();

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError("Unauthorized - No token provided", 401);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new ApiError("Internal Server Error - Token secret is not defined", 500);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError("Unauthorized - User not found", 401);
    }
    
    req.user = {
      _id: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError("Unauthorized - Invalid token", 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new ApiError("Unauthorized - Token expired", 401));
    } else if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError("Internal Server Error", 500));
    }
  }
};

export default verifyToken;
