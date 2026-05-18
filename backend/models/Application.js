import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    reasonType: {
      type: String,
      enum: ["Home", "Outside", "Other"],
    },

    reason: {
      type: String,
    },

    fromDate: {
      type: Date,
    },

    toDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;