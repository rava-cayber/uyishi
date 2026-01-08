import Joi from "joi";

class Validations {
  registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .message(
        "Password must be 6-30 characters long and contain only letters and numbers"
      )
      .required(),
  });

  loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .message(
        "Password must be 6-30 characters long and contain only letters and numbers"
      )
      .required(),
  });
}

export default new Validations();
