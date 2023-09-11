import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile"
// stling files
import "./styles/App.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/footer.scss";
import "./styles/pizzas.scss";
import "./styles/order.scss";
import "./styles/category.scss"
import "./styles/userProfile.scss"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/pizza-room" element={<Pizzas />} />
          <Route path="/category" element={<Category />} />
          <Route path="/pizza/:id" element={ <PizzaPage /> }/>
          <Route path="/logIn" element={ <Login /> }/>
          <Route path="/signUp" element={ <SignUp /> }/>
          <Route path="/user-profile/:id" element={ <UserProfile/> }/>
        </Routes>
        <Footer />
        <ToastContainer position={"bottom-right"} theme="dark" />
      </Router>
    </div>
  );
}

export default App;
