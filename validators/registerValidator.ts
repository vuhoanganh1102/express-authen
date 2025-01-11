import Joi, { ObjectSchema } from "joi";

// Define an interface for the validation data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Create the validation schema
const registerSchema: ObjectSchema<RegisterData> = Joi.object({
  name: Joi.string().min(6).max(225).required(),
  email: Joi.string().min(6).max(225).required().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,20}$")).required(),
});

// Define the validator function
export const registerValidator = (data: RegisterData) => {
  return registerSchema.validate(data);
};
