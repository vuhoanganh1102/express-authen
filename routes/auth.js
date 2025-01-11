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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("./../models/User"));
const registerValidator_1 = require("./../validators/registerValidator");
const authRouter = express_1.default.Router();
authRouter.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request data
    const { error } = (0, registerValidator_1.registerValidator)(request.body);
    if (error) {
        return response.status(422).send(error.details[0].message);
    }
    // Check if the email already exists
    const checkEmailExist = yield User_1.default.findOne({ email: request.body.email });
    if (checkEmailExist) {
        return response.status(422).send("Email already exists");
    }
    try {
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashPassword = yield bcryptjs_1.default.hash(request.body.password, salt);
        // Create a new user
        const user = new User_1.default({
            name: request.body.name,
            email: request.body.email,
            password: hashPassword,
        });
        // Save the user to the database
        const newUser = yield user.save();
        return response.send(newUser);
    }
    catch (err) {
        return response.status(400).send(err);
    }
}));
authRouter.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: request.body.email });
    if (!user)
        return response.status(422).send("Email or Password is not correct");
    const checkPassword = yield bcryptjs_1.default.compare(request.body.password, user.password);
    if (!checkPassword)
        return response.status(422).send("Email or Password is not correct");
    return response.send(`User ${user.name} has logged in`);
}));
exports.default = authRouter;
