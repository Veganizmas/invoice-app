import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  let auth = { token: false };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
