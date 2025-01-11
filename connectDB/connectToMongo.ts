import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    const dbConnect = process.env.DB_CONNECT;
    if (!dbConnect) {
      throw new Error("DB_CONNECT environment variable is not defined");
    }
    await mongoose.connect(dbConnect, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the application on a failure
  }
};

export default connectMongoDB;
