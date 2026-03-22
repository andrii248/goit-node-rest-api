import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import { sendVerificationEmail } from "./emailService.js";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const avatarURL = gravatar.url(payload.email, { s: "250" });
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const verificationToken = nanoid();

  const user = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendVerificationEmail({
    email: user.email,
    verificationToken,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });

  if (!user) throw HttpError(401, "Email or password is wrong");
  if (!user.verify) throw HttpError(401, "Email not verified");

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

export const verifyUserEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await user.update({
    verify: true,
    verificationToken: null,
  });
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendVerificationEmail({
    email: user.email,
    verificationToken: user.verificationToken,
  });
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
};

export const updateAvatar = async (id, avatarURL) => {
  const user = await User.findByPk(id);

  if (!user) throw HttpError(404, "Not found");

  await user.update({ avatarURL });
  return user;
};
