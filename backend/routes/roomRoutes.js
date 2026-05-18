import express from "express";

import {
  addRoom,
  getRooms,
  getAvailableRooms,
} from "../controllers/roomController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// ADD ROOM
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addRoom
);


// GET ALL ROOMS
router.get(
  "/",
  authMiddleware,
  getRooms
);


// GET AVAILABLE ROOMS
router.get(
  "/available",
  authMiddleware,
  getAvailableRooms
);

export default router;