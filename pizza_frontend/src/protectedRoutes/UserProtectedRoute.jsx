import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

export const UserProtectedRoute = ({ children }) => {
  const { loading,isAuthenticate } = useSelector((state) => state.user);
if(loading === true){
  return <Loader />
}else{
  if (!isAuthenticate) {
    return <Navigate to={"/logIn"} replace />;
  }
  return children;
}
};

export const IsLogOut = ({ children }) => {
  const { loading, isAuthenticate } = useSelector((state) => state.user);
  if (loading === true) {
    return <Loader />;
  } else {
    if (isAuthenticate) {
      return <Navigate to={"/"} replace />;
    }
    return children;
  }
};

export const IsAdmin = ({ children }) => {
  const {  isAuthenticate, loading ,user } = useSelector((state) => state.user);
  if (loading === true) {
   return <Loader />;
  }else{
    if (!isAuthenticate) {
      return <Navigate to="/login" replace />;
    } else if (user.isAdmin !== true) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};
