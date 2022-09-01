import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navigation from "./components/Navigation";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Signup />}> */}
        <Route path="/dashboard/addProduct" element={<CreateProduct />} />
        {/* </Route> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
