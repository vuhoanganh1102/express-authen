"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Create the validation schema
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(6).max(225).required(),
    email: joi_1.default.string().min(6).max(225).required().email(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{6,20}$")).required(),
});
// Define the validator function
const registerValidator = (data) => {
    return registerSchema.validate(data);
};
exports.registerValidator = registerValidator;
