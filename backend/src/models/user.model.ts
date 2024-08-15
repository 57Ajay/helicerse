import mongoose, { Document, Model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from "../utils/apiError";

export interface IUser {
  email: string;
  password: string;
  role: 'Principal' | 'Teacher' | 'Student';
  refreshToken?: string;
}

export interface IUserMethods {
  isPasswordMatched(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  // You can add static methods here if needed
}

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Principal', 'Teacher', 'Student'],
    required: true
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isPasswordMatched = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (): Promise<string> {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApiError('ACCESS_TOKEN_SECRET is not defined in the environment', 500);
  }
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    }
  );
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new ApiError('REFRESH_TOKEN_SECRET is not defined in the environment', 500);
  }
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d'
    }
  );
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;