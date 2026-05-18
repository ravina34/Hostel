import express from "express";

import {
  markAttendance,
  getAttendance,
  updateAttendance,
} from "../controllers/attendanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// MARK ATTENDANCE
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  markAttendance
);


// GET ATTENDANCE
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAttendance
);


// UPDATE ATTENDANCE
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateAttendance
);

export default router;