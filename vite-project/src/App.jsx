import './App.css';

import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/home";
import NoPage from "./pages/noPage/noPage";
import ProductInfo from "./pages/productInfo/productInfo";
import ScrollTop from "./components/scrollTop/scrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProducts from "./pages/allProducts/allProducts";
import LogIn from "./pages/registration/logIn";
import SignUp from "./pages/registration/signUp";
import UserDashboard from "./pages/user/UserDashboard";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import { ProtectedRouteForUser } from "./protectedRoutes/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoutes/ProtectedRouteForAdmin";
import AboutUS from "./pages/about/Aboutus";
import CategoryPage from './pages/category/CategoryPage';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import Forgot from './pages/registration/forgotPassword';

library.add(faShoppingCart, faTrash);

const App = () => {
  return(
    <MyState>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/*" element = {<NoPage/>}/>
          <Route path="/productinfo/:id" element = {<ProductInfo/>}/>
          <Route path="/cart" element = {<CartPage/>}/>
          <Route path="/allproducts" element = {<AllProducts/>}/>
          <Route path="/user-dashboard" element = {
            <ProtectedRouteForUser>
              <UserDashboard/>
            </ProtectedRouteForUser>
          }/>
          <Route path="/login" element = {<LogIn/>}/>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/admin-dashboard" element = {
            <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element = {
            <ProtectedRouteForAdmin>
            <AddProductPage/>
          </ProtectedRouteForAdmin>
          }/>
          <Route path="/updateproduct/:id" element = {
            <ProtectedRouteForAdmin>
            <UpdateProductPage/>
          </ProtectedRouteForAdmin>
          }/>

          <Route path="/about" element = {<AboutUS/>}/>
          <Route path="/category/:categoryname" element={<CategoryPage/>} />
          <Route path="/forgot-password" element = {<Forgot/>}/>
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  );
}

export default App;