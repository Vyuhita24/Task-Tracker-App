import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import TeamLeadDashboard from "./pages/teamlead/TeamLeadDashboard";
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import CreateTask from "./pages/teamlead/CreateTask";
import MyTasks from "./pages/developer/MyTasks";
import TaskDetails from "./pages/developer/TaskDetails";
import ReviewTasks from "./pages/teamlead/ReviewTasks";
import Reports from "./pages/reports/Reports";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function DashboardWrapper() {
  const storedUser = localStorage.getItem("user");
  let user = null;
  try { user = storedUser ? JSON.parse(storedUser) : null; } catch { user = null; }
  const roleName = (user?.roleName ?? user?.RoleName ?? "").toUpperCase();
  if (roleName.includes("DEVELOPER") || roleName.includes("MEMBER")) return <DeveloperDashboard />;
  return <TeamLeadDashboard />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["TEAM_LEAD", "DEVELOPER", "ADMIN"]}><DashboardWrapper /></ProtectedRoute>} />
        <Route path="/create-task" element={<ProtectedRoute allowedRoles={["TEAM_LEAD"]}><CreateTask /></ProtectedRoute>} />
        <Route path="/my-tasks" element={<ProtectedRoute allowedRoles={["DEVELOPER", "TEAM_LEAD"]}><MyTasks /></ProtectedRoute>} />
        <Route path="/tasks/:taskId" element={<ProtectedRoute allowedRoles={["DEVELOPER", "TEAM_LEAD"]}><TaskDetails /></ProtectedRoute>} />
        <Route path="/TaskDetails/:taskId" element={<ProtectedRoute allowedRoles={["DEVELOPER", "TEAM_LEAD"]}><TaskDetails /></ProtectedRoute>} />
        <Route path="/review-tasks" element={<ProtectedRoute allowedRoles={["TEAM_LEAD"]}><ReviewTasks /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={["TEAM_LEAD", "MANAGER"]}><Reports /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute allowedRoles={["DEVELOPER", "TEAM_LEAD", "MANAGER"]}><Notifications /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["DEVELOPER", "TEAM_LEAD", "MANAGER", "ADMIN"]}><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
