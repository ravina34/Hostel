import express from "express";

import {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// STUDENT ADD COMPLAINT
router.post(
  "/",
  authMiddleware,
  addComplaint
);


// ADMIN VIEW COMPLAINTS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getComplaints
);


// ADMIN UPDATE STATUS
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateComplaintStatus
);

export default router;