import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AdminLogin from "./pages/admin/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";

import Students from "./pages/admin/Students";

import ProtectedRoute from "./components/ProtectedRoute";
import Rooms from "./pages/admin/Rooms";

import Attendance from "./pages/admin/Attendance";
import Complaints from "./pages/admin/Complaints";

import Notifications from "./pages/admin/Notifications";

import Applications from "./pages/admin/Applications";
import StudentLogin from "./pages/student/StudentLogin";

import StudentDashboard from "./pages/student/StudentDashboard";

import ApplyLeave from "./pages/student/ApplyLeave";

import Complaint from "./pages/student/Complaint";
import StudentNotifications from "./pages/student/StudentNotifications";

import Profile from "./pages/student/Profile";

import StudentEvents from "./pages/student/Events";

import AdminEvents from "./pages/admin/Events";
import MyApplications from "./pages/student/MyApplications";
function App() {
  return (
    <BrowserRouter>

      <Toaster />

      <Routes>
        <Route
  path="/admin/events"
  element={
    <ProtectedRoute>
     <AdminEvents />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/my-applications"
  element={
    <ProtectedRoute>
      <MyApplications />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/notifications"
  element={
    <ProtectedRoute>
      <StudentNotifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/events"
  element={
    <ProtectedRoute>
     <StudentEvents />
    </ProtectedRoute>
  }
/>


        <Route
  path="/student-login"
  element={<StudentLogin />}
/>

<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/apply-leave"
  element={
    <ProtectedRoute>
      <ApplyLeave />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/complaint"
  element={
    <ProtectedRoute>
      <Complaint />
    </ProtectedRoute>
  }
/>


        <Route
  path="/admin/complaints"
  element={
    <ProtectedRoute>
      <Complaints />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/rooms"
  element={
    <ProtectedRoute>
      <Rooms />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>


        <Route
          path="/"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;