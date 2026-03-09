import * as authServices from "../services/authServices.js";

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
