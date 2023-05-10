import express from "express";
import auth from "./auth.js";
import company from "./company.js";
import inventory from "./inventory.js";

const router = express.Router();
router.use(`/auth`, auth);
router.use(`/company`, company);
router.use(`/inventory`, inventory);

export default router;
