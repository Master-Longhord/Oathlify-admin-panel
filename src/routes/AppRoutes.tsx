import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Pending from '../pages/Pending/Pending';
import LoginPage from '../pages/Auth/LoginPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pending" element={<Pending />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
