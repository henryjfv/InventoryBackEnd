import express from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controllers/company.js";
import {
  validatorCreateItem,
  validatorGetItemId,
  validatorUpdateItem
} from "../validators/companies.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRol } from "../middleware/rol.js";

const router = express.Router();

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, checkRol, validatorGetItemId, getItem);
router.post("/", authMiddleware, checkRol, validatorCreateItem, createItem);
router.put(
  "/:id",
  authMiddleware,
  checkRol,
  validatorUpdateItem,
  updateItem
);
router.delete("/:id", authMiddleware, checkRol, validatorGetItemId, deleteItem);

export default router;
