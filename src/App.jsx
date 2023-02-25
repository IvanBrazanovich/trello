import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/login/ChangePassword";
import ForgotPassword from "./pages/login/ForgotPassword";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="change-password/:token" element={<ChangePassword />} />
            <Route path="confirm-account/:token" element={<Register />} />
          </Route>
          <Route path="/app"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
