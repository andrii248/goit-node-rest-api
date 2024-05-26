import Joi from "joi";
import { phoneRegex, nameRegex } from "../constants/contact-constants.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(nameRegex).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(nameRegex),
  email: Joi.string().email(),
  phone: Joi.string().min(5).pattern(phoneRegex),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
