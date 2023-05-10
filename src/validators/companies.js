import { check } from "express-validator";
import { validateResult } from "../utils/handleValidators.js";

export const validatorCreateItem = [
  check("name").exists().notEmpty(),
  check("address").exists().notEmpty(),
  check("legalNumber").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

export const validatorUpdateItem = [
  check("id").exists().notEmpty(),
  check("name").exists().notEmpty(),
  check("address").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

export const validatorGetItemId = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];
