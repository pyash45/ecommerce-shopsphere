import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const adminToken =
    localStorage.getItem('admin');

  if (!adminToken) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;