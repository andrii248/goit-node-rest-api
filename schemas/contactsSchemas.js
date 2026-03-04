import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .pattern(/^[\d\s-]+$/)
    .required()
    .min(5),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone: Joi.string()
    .pattern(/^[\d\s-]+$/)
    .min(5),
})
  .min(1)
  .message({ "object.min": "Body must have at least one field" });
