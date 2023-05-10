import { handleHttpError } from "../utils/handleError.js";

export const checkRol = (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
 
    const checkValueRol = ["admin"].some(
      (rolSingle) => rolesByUser.shift() === rolSingle
    );

    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS");
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR PERMISSIONS");
  }
};
