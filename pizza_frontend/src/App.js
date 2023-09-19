import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/Action/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Order from "./components/Order";
import Pizzas from "./components/Pizzas";
import Category from "./components/Category";
import PizzaPage from "./pages/PizzaPage";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ActivationPage from "./pages/ActivationPage";
import Registration from "./components/UserRegistration/Registration";
import UpdateProfile from "./pages/UpdateProfile";
import { IsAdmin, IsLogOut, UserProtectedRoute} from "./protectedRoutes/UserProtectedRoute";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAllUsers from "./pages/AdminAllUsers";
import AdminBanUsers from "./pages/AdminBanUsers";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// stling files
import "./styles/App.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/footer.scss";
import "./styles/pizzas.scss";
import "./styles/order.scss";
import "./styles/category.scss";





function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/pizza-room" element={<Pizzas />} />
          <Route path="/category" element={<Category />} />
          <Route path="/pizza/:id" element={<PizzaPage />} />
          <Route path="/logIn" element={
          <IsLogOut>
          <Login />
          </IsLogOut>
          } />
          <Route path="/forget-password" element={
          <IsLogOut>
          <ForgetPassword />
          </IsLogOut>
          } />
          <Route path="/api/user/reset-password/:token" element={
          <ResetPassword />
          } />
          <Route path="/register" element={
         <IsLogOut>
          <Registration />
         </IsLogOut>
          } />
          <Route
            path="/api/user/activate/:token"
            element={
            <ActivationPage />
            }
          />
          <Route
            path="/user-profile"
            element={
              <UserProtectedRoute>
                <UserProfile />
              </UserProtectedRoute>
            }
          />
          <Route path="/profile-settings"
           element={
           <UserProtectedRoute>
           <UserProfile />
           </UserProtectedRoute>
           } />
          <Route path="/update-user" element={
          <UserProtectedRoute>
          <UpdateProfile />
          </UserProtectedRoute>
          } />
          <Route path="/change-password" element={
          <UserProtectedRoute>
          <UpdatePasswordPage />
          </UserProtectedRoute>
          } />

          {/* Admin Routes */}

          <Route path="/admin-dashboard" element={
            <IsAdmin>
            <AdminDashboard />
            </IsAdmin>
          } />
          <Route path="/admin-users" element={
            <IsAdmin>
            <AdminAllUsers />
            </IsAdmin>
          } />
           <Route path="/admin-banusers" element={
            <IsAdmin>
            <AdminBanUsers />
            </IsAdmin>
          } />
        </Routes>
        <Footer />
        <ToastContainer position={"bottom-right"} theme="dark" />
      </Router>
    </div>
  );
}

export default App;
