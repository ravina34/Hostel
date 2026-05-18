import express from "express";

import {
  createEvent,
  getEvents,
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
// CREATE EVENT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent
);

// GET EVENTS
router.get("/", getEvents);

export default router;