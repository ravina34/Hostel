import bcrypt from "bcryptjs";

import Student from "../models/Student.js";
import Room from "../models/Room.js";


// ADD STUDENT
export const addStudent = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      email,
      password,
      address,
      session,
      branch,
      year,
      roomNumber,
    } = req.body;

    // CHECK EMAIL
    const studentExists = await Student.findOne({
      email,
    });

    if (studentExists) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    // CHECK ROOM
    const room = await Room.findOne({
      roomNumber,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // CHECK AVAILABLE BED
    if (room.availableBeds <= 0) {
      return res.status(400).json({
        message: "No beds available",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE STUDENT
    const student = await Student.create({
      name,
      fatherName,
      email,
      password: hashedPassword,
      address,
      session,
      branch,
      year,
      roomNumber,
    });

    // UPDATE ROOM
    room.occupiedBeds += 1;
    room.availableBeds -= 1;

    // IF NO BED LEFT
    if (room.availableBeds === 0) {
      room.isAvailable = false;
    }

    await room.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL STUDENTS
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE STUDENT
export const getSingleStudent = async (
  req,
  res
) => {
  try {
    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE STUDENT
export const updateStudent = async (
  req,
  res
) => {
  try {
    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.name =
      req.body.name || student.name;

    student.fatherName =
      req.body.fatherName ||
      student.fatherName;

    student.address =
      req.body.address ||
      student.address;

    student.branch =
      req.body.branch ||
      student.branch;

    student.year =
      req.body.year || student.year;

    await student.save();

    res.json({
      message: "Student updated",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE STUDENT
export const deleteStudent = async (
  req,
  res
) => {
  try {
    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // UPDATE ROOM
    const room = await Room.findOne({
      roomNumber: student.roomNumber,
    });

    if (room) {
      room.occupiedBeds -= 1;

      room.availableBeds += 1;

      room.isAvailable = true;

      await room.save();
    }

    await student.deleteOne();

    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};