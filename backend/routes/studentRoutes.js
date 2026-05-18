import express from "express";

import {
  addStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// ADD STUDENT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addStudent
);


// GET ALL STUDENTS
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getStudents
);


// GET SINGLE STUDENT
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSingleStudent
);


// UPDATE STUDENT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateStudent
);


// DELETE STUDENT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteStudent
);

export default router;