import { check } from "express-validator";
import { validateResult } from "../utils/handleValidators.js";

export const validatorAuth   = [
    check('email').exists().notEmpty().isEmail().normalizeEmail(),
    check('password').isLength({ min: 8, max: 64 }).withMessage('must be at least 8 chars long'),
    (req, res, next) => validateResult(req, res, next)
];

// comments
export const validatorRegister   = [
    check('email').exists().notEmpty().isEmail().normalizeEmail(),
    check('password').isLength({ min: 8, max: 64 }).withMessage('must be at least 8 chars long'),
    check('role').exists().notEmpty(),
    (req, res, next) => validateResult(req, res, next)
];
