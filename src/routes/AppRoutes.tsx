import { Route, Routes } from 'react-router-dom';

// Layouts for each "Mansion"
import AdminLayout from '../layouts/AdminLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout'; // We will create this next

// Auth Components
import LoginPage from '../pages/Auth/LoginPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginRedirect from '../components/auth/LoginRedirect'; // We will create this

// Admin (Lawyer) Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import Pending from '../pages/Pending/Pending';
import Approved from '../pages/Approved/Approved';
import Users from '../pages/Users/Users';
import Settings from '../pages/Settings/Settings';
import Declined from '../pages/Declined/Declined';

// Super Admin Pages
import SuperAdminDashboard from '../pages/SuperAdmin/Dashboard'; // We will create this
import SuperAdminUsers from '../pages/SuperAdmin/Users';
import Templates from '../pages/SuperAdmin/Templates';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/handle-login" element={<LoginRedirect />} />

      <Route element={<ProtectedRoute />}>
        
        {/* Mansion 1: Admin (Lawyer) Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="pending" element={<Pending />} />
          <Route path="approved" element={<Approved />} />
          <Route path="declined" element={<Declined />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Mansion 2: Super Admin Routes */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="templates" element={<Templates />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
