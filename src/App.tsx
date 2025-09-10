import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
