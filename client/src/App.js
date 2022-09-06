import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Product from "./pages/Product";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard/odrer" element={<OrderPage />} />
        <Route path="/dashboard/addProduct" element={<CreateProduct />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
