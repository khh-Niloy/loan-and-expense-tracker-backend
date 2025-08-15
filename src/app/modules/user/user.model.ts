import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

// Enum mapping for Mongoose
const userStatusEnum = ["ACTIVE", "INACTIVE"] as const;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name can be max 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
    match: [/^01\d{9}$/, "Invalid Bangladeshi phone number"], // E.164 format
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: String,
    enum: userStatusEnum,
    default: "ACTIVE",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  credits: {
    type: Number,
    default: 0,
    min: [0, "Credits cannot be negative"],
  },
}, { 
  timestamps: true, 
  versionKey: false 
});

// Export the model
export const User = model<IUser>("User", userSchema);
