import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(5)
    .pattern(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(5)
    .pattern(/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
