import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
