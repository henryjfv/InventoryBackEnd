import express from "express";

import {
  validatorCreateItem,
  validatorGetItemId,
  validatorGetItemCompanyId,
  validatorValidEmail,
  validatorGetItemCompanyIdCompanyName
} from "../validators/inventory.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRol } from "../middleware/rol.js";

import { getItems, createItem, deleteItem, sendPdfToEmail, downloadPdf } from "../controllers/inventory.js";

const router = express.Router();

router.get("/:companyId", authMiddleware, checkRol, validatorGetItemCompanyId, getItems);
router.post("/", authMiddleware, checkRol, validatorCreateItem, createItem);
router.delete("/:id", authMiddleware, checkRol, validatorGetItemId, deleteItem);
router.post("/send", authMiddleware, checkRol, validatorValidEmail, sendPdfToEmail);
router.get("/download/:companyId/:companyName", authMiddleware, checkRol, validatorGetItemCompanyIdCompanyName, downloadPdf);

export default router;
