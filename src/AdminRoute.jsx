import { getUser } from "./services/authorize";
import { Navigate, Outlet } from "react-router-dom";

//create route to protect admin routes from unauthorized access routes and redirect to login page
const AdminRoute = () => {
  if (getUser()) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin" />;
  }
};

export default AdminRoute;
