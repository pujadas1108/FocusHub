import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import StudentLogin from "../pages/student/StudentLogin";
import StudentRegister from "../pages/student/StudentRegister";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentRooms from "../pages/student/StudentRooms";
import TeacherLogin from "../pages/teacher/TeacherLogin";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCreateRoom from "../pages/teacher/TeacherCreateRoom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCreateTeacher from "../pages/admin/AdminCreateTeacher";
import RoomChat from "../pages/RoomChat";
import TeacherRooms from "../pages/teacher/TeacherRooms";
import TeacherUploadNote from "../pages/teacher/TeacherUploadNote";
import ProtectedRoute from "./ProtectedRoute";
import StudentNotes from "../pages/student/StudentNotes";
import StudentProductivity from "../pages/student/StudentProductivity";
import VideoSession from "../pages/VideoSession";
import AdminTeachers from "../pages/admin/AdminTeachers";
import AdminStudents from "../pages/admin/AdminStudents";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import StudentJoinedRooms from "../pages/student/StudentJoinedRooms";
import AdminQueries from "../pages/admin/AdminQueries";
import StudentMeritTest from "../pages/student/StudentMeritTest";
import AdminMeritResults from "../pages/admin/AdminMeritResults";
import AdminCreateRoutine from "../pages/admin/AdminCreateRoutine";
import AdminRoutines from "../pages/admin/AdminRoutines";
import StudentRoutine from "../pages/student/StudentRoutine";
import TeacherRoutine from "../pages/teacher/TeacherRoutine";
import AdminPayments from "../pages/admin/AdminPayments";
import StudentPayments from "../pages/student/StudentPayments";
import AdminExams from "../pages/admin/AdminExams";
import StudentExams from "../pages/student/StudentExams";
import StudentCertificates from "../pages/student/StudentCertificates";
import TeacherAttendance from "../pages/teacher/TeacherAttendance";
import StudentAttendance from "../pages/student/StudentAttendance";
import AdminAttendance from "../pages/admin/AdminAttendance";
import StudentPerformance from "../pages/student/StudentPerformance";
import StudentProfile from "../pages/student/StudentProfile";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherPayments from "../pages/teacher/TeacherPayments";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/upload-note"
        element={
          <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
            <TeacherUploadNote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/rooms"
        element={
          <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
            <StudentRooms />
          </ProtectedRoute>
        }
      />

      <Route path="/teacher/login" element={<TeacherLogin />} />

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/create-room"
        element={
          <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
            <TeacherCreateRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/rooms"
        element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
            <TeacherRooms />
            </ProtectedRoute>
        }
       />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-teacher"
        element={
          <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminCreateTeacher />
          </ProtectedRoute>
        }
      />
      <Route path="/room/:roomId/chat" element={<RoomChat />} />
      <Route
        path="/student/joined-rooms"
        element={
            <ProtectedRoute
            tokenName="studentToken"
            redirectTo="/student/login"
            >
            <StudentJoinedRooms />
            </ProtectedRoute>
        }
        />

      
     <Route
        path="/teacher/upload-note"
        element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
            <TeacherUploadNote />
            </ProtectedRoute>
        }
     />
     <Route
        path="/student/notes"
        element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
            <StudentNotes />
            </ProtectedRoute>
        }
     />
     <Route
        path="/student/productivity"
        element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
             <StudentProductivity />
            </ProtectedRoute>
        }
     />
     <Route
        path="/room/:roomId/video"
        element={<VideoSession />}
     />
     <Route
        path="/admin/teachers"
        element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminTeachers />
            </ProtectedRoute>
        }
     />
     <Route
        path="/admin/students"
        element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminStudents />
            </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminAnalytics />
            </ProtectedRoute>
        }
      />

       <Route
        path="/admin/queries"
        element={
          <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
            <AdminQueries />
          </ProtectedRoute>
        }
       />
       <Route
        path="/student/merit-test"
        element={
          <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
            <StudentMeritTest />
          </ProtectedRoute>
        }
       />
       <Route
          path="/admin/merit-results"
          element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
              <AdminMeritResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-routine"
          element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
              <AdminCreateRoutine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/routines"
          element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
              <AdminRoutines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/routine"
          element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
              <StudentRoutine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/routine"
          element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
              <TeacherRoutine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
              <AdminPayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/payments"
          element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
              <StudentPayments />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/exams" element={<ProtectedRoute tokenName="adminToken" redirectTo="/admin/login"><AdminExams /></ProtectedRoute>} />
        <Route path="/student/exams" element={<ProtectedRoute tokenName="studentToken" redirectTo="/student/login"><StudentExams /></ProtectedRoute>} />
        <Route path="/student/certificates" element={<ProtectedRoute tokenName="studentToken" redirectTo="/student/login"><StudentCertificates /></ProtectedRoute>} />
        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
              <TeacherAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute tokenName="adminToken" redirectTo="/admin/login">
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/performance"
          element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
              <StudentPerformance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute tokenName="studentToken" redirectTo="/student/login">
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/profile"
          element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
              <TeacherProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/payments"
          element={
            <ProtectedRoute tokenName="teacherToken" redirectTo="/teacher/login">
              <TeacherPayments />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default AppRoutes;