import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    session: {
      type: String,
    },

    branch: {
      type: String,
    },

    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
    },

    roomNumber: {
      type: String,
    },

    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;