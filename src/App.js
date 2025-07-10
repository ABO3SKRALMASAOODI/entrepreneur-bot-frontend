import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";

import API from "./api/api"; // Use your custom Axios instance

import SignIn from "./pages/SignIn";
import Legal from "./pages/legal";
import VerifyCode from "./pages/VerifyCode";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import EnterPassword from "./pages/EnterPassword";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import PaddleCheckoutPage from "./pages/PaddleCheckoutPage";
import SubscribePage from "./pages/SubscribePage";

function AppWrapper() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval;

    const refreshToken = async () => {
      try {
        const res = await API.post("/auth/refresh-token");
        const token = res.data.access_token;
        localStorage.setItem("token", token);
      } catch (err) {
        console.warn("⚠️ Background token refresh failed");
        localStorage.removeItem("token");
      }
    };

    const checkAuthAndMaybeRedirect = async () => {
      try {
        let token = localStorage.getItem("token");

        // Try refreshing token if missing
        if (!token) {
          const res = await API.post("/auth/refresh-token");
          token = res.data.access_token;
          localStorage.setItem("token", token);
        }

        // 🔁 Start background refresh every 10 minutes
        interval = setInterval(refreshToken, 600000); // 10 mins

        // If user is on landing page, redirect if already subscribed
        if (location.pathname === "/") {
          const subRes = await API.get("/auth/status/subscription");
          if (subRes.data.is_subscribed) {
            navigate("/chat");
          }
        }
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndMaybeRedirect();

    return () => clearInterval(interval);
  }, [navigate, location]);

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  }

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/enter-password" element={<EnterPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/paddle-checkout" element={<PaddleCheckoutPage />} />
      <Route path="/subscribe" element={<SubscribePage />} />
      <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
