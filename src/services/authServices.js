import bcrypt from "bcrypt";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import gravatar from "gravatar";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const avatarURL = gravatar.url(payload.email, { s: "250" });
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword, avatarURL });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  await user.update({ token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = (user) => {
  return user.update({ token: null });
};

export const updateAvatar = async (id, avatarURL) => {
  const user = await User.findByPk(id);
  if (!user) throw HttpError(404, "Not found");

  await user.update({ avatarURL });
  return user;
};
