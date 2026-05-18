import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import Admin from "./models/Admin.js";
import studentRoutes from "./routes/studentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

import complaintRoutes from "./routes/complaintRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";

import applicationRoutes from "./routes/applicationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://hostel-5-wyw3.onrender.com",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
  })
);

app.options("*", cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);


// DEFAULT ADMIN CREATE
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        "admin123",
        10
      );

      await Admin.create({
        email: "admin@gmail.com",
        password: hashedPassword,
      });

      console.log("Default Admin Created");
    }
  } catch (error) {
    console.log(error);
  }
};

createDefaultAdmin();


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/attendance", attendanceRoutes);
app.use(
  "/api/events",
  eventRoutes
);
app.use("/api/complaints", complaintRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/applications", applicationRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.get("/", (req, res) => {
  res.send("Hostel Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
