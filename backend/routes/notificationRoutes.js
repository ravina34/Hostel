import express from "express";

import {
  createNotification,
  getNotifications,
  deleteNotification,
} from "../controllers/notificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// CREATE
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createNotification
);


// GET
router.get(
  "/",
  authMiddleware,
  getNotifications
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteNotification
);

export default router;