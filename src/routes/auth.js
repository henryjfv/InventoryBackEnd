import express from "express";
import { loginCtrl, registerCtrl } from "../controllers/auth.js";
import { validatorRegister, validatorAuth } from "../validators/auth.js";

const router = express.Router();

router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorAuth, loginCtrl);

export default router;
