import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;