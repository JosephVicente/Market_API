import joi from "joi";

export const AuthSchemaJoi = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
