import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import type { JSX } from "react";
import { useAuth } from "./hooks/useAuth";
import { Loader2 } from "lucide-react";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading)
    return (
      <Loader2 className="animate-spin size-6 flex items-center justify-center" />
    );
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
