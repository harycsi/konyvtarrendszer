import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  roleRequired?: 'admin' | 'user';
}

export const ProtectedRoute = ({ roleRequired }: ProtectedRouteProps) => {
  const adminToken = localStorage.getItem('admin_token');
  const userToken = localStorage.getItem('user_token');

  if (roleRequired === 'admin') {
    if (!adminToken) {
      return <Navigate to="/konyvtar" replace />;
    }
    return <Outlet />;
  }

  if (roleRequired === 'user') {
    if (!userToken) {
      return <Navigate to="/konyvtarrendszer" replace />;
    }
    return <Outlet />;
  }

  if (!adminToken && !userToken) {
    return <Navigate to="/belepes" replace />;
  }

  return <Outlet />;
};