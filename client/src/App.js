import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import AllOrder from "./pages/AllOrder";
import AllUser from "./pages/AllUser";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import CreateProduct from "./pages/CreateProduct";
import EditProductPage from "./pages/EditProductPage";
import GetAllProducts from "./pages/GetAllProducts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import UserProfile from "./pages/UserProfile";

function App() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // const socket = io.connect("http://localhost:5000");
    const socket = io.connect("https://calm-beach-92689.herokuapp.com/");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      // logic for notification
      if (user_id === user?._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user?.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);

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
        <Route path="/checkout" element={user ? <Checkout /> : <Login />} />
        <Route
          path="dashboard/myodrer"
          element={user ? <OrderPage /> : <Home />}
        />
        <Route
          path="dashboard/profile"
          element={user ? <UserProfile /> : <Home />}
        />
        <Route
          path="/dashboard/addProduct"
          element={user?.isAdmin ? <CreateProduct /> : <Home />}
        />
        <Route
          path="/product/:id/edit"
          element={user?.isAdmin ? <EditProductPage /> : <Home />}
        />
        <Route
          path="/dashboard/users"
          element={user?.isAdmin ? <AllUser /> : <Home />}
        />
        <Route
          path="/dashboard/allProduct"
          element={user?.isAdmin ? <GetAllProducts /> : <Home />}
        />
        <Route
          path="/dashboard/allOrder"
          element={user?.isAdmin ? <AllOrder /> : <Home />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
