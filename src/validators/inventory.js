import { check } from "express-validator";
import { validateResult } from "../utils/handleValidators.js";

export const validatorCreateItem = [
  check("product").exists().notEmpty(),
  check("total").exists().notEmpty(),
  check("companyId").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

export const validatorGetItemCompanyId = [
  check("companyId").exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export const validatorGetItemId = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export const validatorValidEmail = [
  check('email').exists().notEmpty().isEmail().normalizeEmail(),
  check("companyId").exists().notEmpty(),
  check("companyName").exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export const validatorGetItemCompanyIdCompanyName = [
  check("companyId").exists().notEmpty(),
  check("companyName").exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];


