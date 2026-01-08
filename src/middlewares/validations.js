import validation from "../utils/validation.js";

export default (req, res, next) => {
  if (req.path === "/api/register") {
    const { error } = validation.registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
  } else if (req.path === "/api/login") {
    const { error: loginError } = validation.loginSchema.validate(req.body);
    if (loginError) {
      return res.status(400).json({
        status: 400,
        error: loginError.details[0].message,
      });
    }
  }

  next();
};
