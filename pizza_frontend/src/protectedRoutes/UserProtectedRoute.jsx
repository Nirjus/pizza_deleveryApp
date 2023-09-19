import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const UserProtectedRoute = ({children}) => {
       const {isAuthenticate} = useSelector((state) => state.user);
     
      if(!isAuthenticate){
        return <Navigate to={"/logIn"} replace/>
      }
      return children

}

export const IsLogOut = ({children}) => {
  const {isAuthenticate} = useSelector((state) => state.user);
     
  if(isAuthenticate){
    return <Navigate to={"/"} replace/>
  }
  return children

}

export const IsAdmin = ({children}) => {
  const { loading,isAuthenticate,user} = useSelector((state) => state.user);

 if(loading === false){
           if(!isAuthenticate){
            return <Navigate to="/login" replace/>
           }else if(user.isAdmin !== true){
            return <Navigate to="/" replace/>
           }
           return children
      }
 return children

}
