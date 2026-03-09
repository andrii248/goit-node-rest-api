import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logoutUserController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController,
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutUserController);

export default authRouter;
