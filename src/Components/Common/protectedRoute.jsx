import { Navigate } from "react-router";
import { getLoggedInUser } from "../Utils/helperFunction";

// protected routes are used to prevent the user to navigate to login screen if the user is already logged In and also it prevents the user to navigate to member screen if the user tries to navigate without login.

const ProtectedRoute = ({ children }) => {
    const currentUser = getLoggedInUser()
    return currentUser?.id ? children : <Navigate to="/Login" />;
}

export default ProtectedRoute;