import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({children}) => {
       const {isAuthenticate} = useSelector((state) => state.user);
     
      if(!isAuthenticate){
        return <Navigate to={"/login"} replace/>
      }
      return children

}

export default UserProtectedRoute