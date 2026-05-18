import express from "express";

import {
  applyLeave,
  getApplications,
  updateApplicationStatus,
  getMyApplications,
} from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// APPLY LEAVE
router.post(
  "/",
  authMiddleware,
  applyLeave
);

// GET ALL APPLICATIONS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getApplications
);

// GET MY APPLICATIONS
router.get(
  "/my",
  authMiddleware,
  getMyApplications
);

// UPDATE STATUS
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

export default router;