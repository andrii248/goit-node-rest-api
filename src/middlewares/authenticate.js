import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwtToken.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw HttpError(401, "Not authorized");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw HttpError(401, "Not authorized");
  }

  const { data, error } = verifyToken(token);

  if (error) throw HttpError(401, "Not authorized");

  const user = await findUser({ id: data.id });

  if (!user || user.token !== token) throw HttpError(401, "Not authorized");
  req.user = user;
  next();
};

export default authenticate;
