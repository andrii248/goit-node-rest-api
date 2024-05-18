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
    .pattern(/^\d[\d\- ]*\d$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(5)
    .pattern(/^\d[\d\- ]*\d$/),
});
