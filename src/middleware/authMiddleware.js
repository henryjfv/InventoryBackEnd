import { UserModel } from "../models/index.js";
import { handleHttpError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    const user = await UserModel.findOne({ where: { id: dataToken.id } });
    req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};
