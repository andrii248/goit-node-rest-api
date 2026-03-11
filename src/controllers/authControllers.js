import * as authServices from "../services/authServices.js";
import path from "node:path";
import fs from "node:fs/promises";
import HttpError from "../helpers/HttpError.js";

export const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const loginController = async (req, res) => {
  const result = await authServices.loginUser(req.body);
  res.json(result);
};

export const getCurrentController = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription,
  });
};

export const logoutUserController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.status(204).send();
};

export const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { id } = req.user;
  const { path: oldPath, originalname } = req.file;

  const extension = path.extname(originalname);
  const filename = `${id}_${Date.now()}${extension}`;
  const newPath = path.resolve("public", "avatars", filename);

  await fs.rename(oldPath, newPath);

  const avatarURL = `/avatars/${filename}`;
  await authServices.updateAvatar(id, avatarURL);

  res.status(200).json({ avatarURL });
};
