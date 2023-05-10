import { matchedData } from "express-validator";
import { encrypt, compare } from "../utils/handlePassword.js";
import { tokenSign } from "../utils/handleJwt.js";
import { UserModel } from "../models/index.js";
import { handleHttpError } from "../utils/handleError.js";

export const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await UserModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.status(201);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

export const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);

    const user = await UserModel.find()
      .where("email")
      .equals(req.email)

    if (!user) {
      handleHttpError(res, "USER NOT EXIST", 404);
      return;
    }
    const hashPassword = user[0]?.get('password');
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const data = {
      token: tokenSign(user[0]),
      user: {
        email: user[0].get('email'),
        role: user[0].get('role'),
      },
    };
    res.send({ data });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:47 ~ loginCtrl ~ error:", error);
  }
};
