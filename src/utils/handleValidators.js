import { validationResult } from "express-validator";
import { handleHttpError } from "../utils/handleError.js"
export const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        handleHttpError(res, error.array())
    }
}