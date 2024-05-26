import Joi from "joi";
import {
  emailRegex,
  subscriptionOptions,
} from "../constants/user-constants.js";

export const authSignupSchema = Joi.object({
  // name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6),
  subscription: Joi.string().valid(...subscriptionOptions),
});

export const authUpdateSchema = Joi.object({
  // name: Joi.string().min(2).max(30),
  email: Joi.string().pattern(emailRegex),
  password: Joi.string().min(6),
  subscription: Joi.string().valid(...subscriptionOptions),
});
