import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "./../models/User";
import {
  registerValidator,
  RegisterData,
} from "./../validators/registerValidator";

const authRouter = express.Router();

authRouter.post(
  "/register",
  async (request: Request, response: Response): Promise<any> => {
    // Validate request data
    const { error } = registerValidator(request.body as RegisterData);

    if (error) {
      return response.status(422).send(error.details[0].message);
    }

    // Check if the email already exists
    const checkEmailExist = await User.findOne({ email: request.body.email });
    if (checkEmailExist) {
      return response.status(422).send("Email already exists");
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(request.body.password, salt);

      // Create a new user
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword,
      });

      // Save the user to the database
      const newUser = await user.save();
      return response.send(newUser);
    } catch (err) {
      return response.status(400).send(err);
    }
  }
);
authRouter.post(
  "/login",
  async (request: Request, response: Response): Promise<any> => {
    const user = await User.findOne({ email: request.body.email });
    if (!user)
      return response.status(422).send("Email or Password is not correct");

    const checkPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!checkPassword)
      return response.status(422).send("Email or Password is not correct");

    return response.send(`User ${user.name} has logged in`);
  }
);
export default authRouter;
