import { Router } from "express";
import validation from "../middlewares/validations.js";
import userController from "../controllers/users.controller.js";

const router = Router();
router.post("/api/register", validation, userController.register);
router.post("/api/login", validation, userController.login);

export default router;
