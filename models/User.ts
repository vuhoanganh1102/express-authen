import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
});

// Export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
