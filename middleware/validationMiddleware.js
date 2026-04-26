import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);

        const firstMessage = errorMessages[0];

        if (firstMessage.startsWith("Вакансія")) {
          throw new NotFoundError(firstMessage);
        }
        if (firstMessage.startsWith("Ви не маєте прав")) {
          throw new UnauthorizedError(
            "Ви не маєте прав для доступу до цієї вакансії",
          );
        }
        throw new BadRequestError(errorMessages.join(", "));
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("Назва компанії не може бути порожньою"),
  body(`position`)
    .notEmpty()
    .withMessage("Назва посади не може бути порожньою"),
  body(`jobLocation`)
    .notEmpty()
    .withMessage("Місцезнаходження не може бути порожнім"),
  body(`status`)
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Невірний статус вакансії"),
  body(`jobType`)
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Невірний тип вакансії"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError(`Невірний формат MongoDB ID`);
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`Вакансія ${value} не знайдена`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError(
        "Ви не маєте прав для доступу до цієї вакансії",
      );
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body(`name`).notEmpty().withMessage("Ім'я не може бути порожнім"),
  body(`email`)
    .notEmpty()
    .withMessage("Email не може бути порожнім")
    .isEmail()
    .withMessage("Невірний формат email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email вже використовується");
      }
    }),
  body(`password`)
    .notEmpty()
    .withMessage("Пароль не може бути порожнім")
    .isLength({ min: 8 })
    .withMessage("Пароль повинен бути не менше 8 символів"),
  body(`location`)
    .notEmpty()
    .withMessage("Місцезнаходження не може бути порожнім"),
  body(`lastName`).notEmpty().withMessage("Прізвище не може бути порожнім"),
]);

export const validateLoginInput = withValidationErrors([
  body(`email`)
    .notEmpty()
    .withMessage("Email не може бути порожнім")
    .isEmail()
    .withMessage("Невірний формат email"),
  body(`password`).notEmpty().withMessage("Пароль не може бути порожнім"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body(`name`).notEmpty().withMessage("Ім'я не може бути порожнім"),
  body(`email`)
    .notEmpty()
    .withMessage("Email не може бути порожнім")
    .isEmail()
    .withMessage("Невірний формат email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email вже використовується");
      }
    }),
  body(`location`)
    .notEmpty()
    .withMessage("Місцезнаходження не може бути порожнім"),
  body(`lastName`).notEmpty().withMessage("Прізвище не може бути порожнім"),
]);
