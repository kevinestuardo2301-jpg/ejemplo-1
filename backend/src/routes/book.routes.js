"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getBooks);
router.post("/", isAdmin, createBook);
router.patch("/detail/", isAdmin, updateBook);
router.delete("/detail/", isAdmin, deleteBook);

export default router;
