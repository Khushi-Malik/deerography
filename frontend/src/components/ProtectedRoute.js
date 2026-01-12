import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const isLoggedIn = getCookie('loggedin') === 'true';
  const username = getCookie('username');

  if (!isLoggedIn || !username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;