import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePasswords } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments({})) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  const token = createJWT({ userId: user._id, role: user.role });

  res.status(StatusCodes.CREATED).json({
    msg: `Користувач ${user.name} успішно зареєстрований`,
    token,
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      role: user.role,
    },
  });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePasswords(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError(`Невірний email або пароль`);

  const token = createJWT({ userId: user._id, role: user.role });

  res.status(StatusCodes.OK).json({
    msg: `Користувач ${user.name} успішно увійшов`,
    token,
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      role: user.role,
    },
  });
};

export const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: `Користувач успішно вийшов` });
};
