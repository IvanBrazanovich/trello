import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkSpace from "./components/app/WorkSpace";
import WorkSpaces from "./components/app/WorkSpaces";
import Board from "./pages/app/Board";
import Home from "./pages/app/Home";
import ProtectedAppRoute from "./pages/app/ProtectedAppRoute";
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
          <Route path="/app" element={<ProtectedAppRoute />}>
            <Route path="" element={<Home />}>
              <Route index element={<WorkSpaces />} />
              <Route path="w/:token" element={<WorkSpace />} />
            </Route>
            <Route path="board/:token" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
