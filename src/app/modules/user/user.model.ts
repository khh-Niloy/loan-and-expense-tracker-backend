import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    // userId: {type: Schema.Types.ObjectId},
    name: {type: String, required: true},
    // email: {type: String},
    phoneNumber: {type: String, unique: true, required: true},
}, {timestamps: true, versionKey: false})

export const User = model("User", userSchema)