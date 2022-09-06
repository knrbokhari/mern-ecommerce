import { useSelector } from "react-redux";
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
import GetAllProducts from "./pages/GetAllProducts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Product from "./pages/Product";
import Signup from "./pages/Signup";

function App() {
  const user = useSelector((state) => state?.user);

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
        <Route path="/cart" element={user ? <CartPage /> : <Home />} />
        <Route path="/checkout" element={user ? <Checkout /> : <Home />} />
        <Route
          path="dashboard/myodrer"
          element={user ? <OrderPage /> : <Home />}
        />
        <Route
          path="/dashboard/addProduct"
          element={user?.isAdmin ? <CreateProduct /> : <Home />}
        />
        <Route
          path="/dashboard/allProduct"
          element={user?.isAdmin ? <GetAllProducts /> : <Home />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
