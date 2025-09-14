import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from './pages/Register'
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
