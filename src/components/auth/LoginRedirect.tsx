import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user?.role === 'SUPER_ADMIN') {
    return <Navigate to="/super-admin" replace />;
  }
  
  if (user?.role === 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default LoginRedirect;