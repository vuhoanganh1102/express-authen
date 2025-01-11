"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnect = process.env.DB_CONNECT;
        if (!dbConnect) {
            throw new Error("DB_CONNECT environment variable is not defined");
        }
        yield mongoose_1.default.connect(dbConnect, {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Exit the application on a failure
    }
});
exports.default = connectMongoDB;
