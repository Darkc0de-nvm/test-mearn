import { verifyJWT } from "../utils/tokenUtils.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { TEST_USER_ID } from "../utils/constants.js";

export const authenticateUser = (req, res, next) => {
  // Check for token in cookies first
  let token = req.cookies.token;

  // If no token in cookies, check Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  if (!token) throw new UnauthenticatedError("аутентифікація недійсна");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === TEST_USER_ID;
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("аутентифікація недійсна");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "Ви не маєте прав для доступу до цієї сторінки",
      );
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser)
    throw new BadRequestError(`Привиди не можуть взаємодіяти!`);
  next();
};
