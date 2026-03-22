import { Router } from "express";

import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import {
  authRegisterSchema,
  authLoginSchema,
  emailVerificationSchema,
} from "../schemas/authSchemas.js";

import {
  registerController,
  loginController,
  verifyEmailController,
  resendVerificationEmailController,
  getCurrentController,
  logoutUserController,
  updateAvatarController,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController,
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.get("/verify/:verificationToken", verifyEmailController);

authRouter.post(
  "/verify",
  validateBody(emailVerificationSchema),
  resendVerificationEmailController,
);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutUserController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController,
);

export default authRouter;
