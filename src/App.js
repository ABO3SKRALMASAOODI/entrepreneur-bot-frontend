import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
    const checkAuthAndRedirect = async () => {
      try {
        let token = localStorage.getItem("token");

        // Try refreshing if no token
        if (!token) {
          const res = await axios.post(
            "https://entrepreneur-bot-backend.onrender.com/auth/refresh-token",
            {},
            { withCredentials: true }
          );
          token = res.data.access_token;
          localStorage.setItem("token", token);
        }

        // Now check subscription
        const subRes = await axios.get(
          "https://entrepreneur-bot-backend.onrender.com/auth/status/subscription",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );

        const { is_subscribed } = subRes.data;

        // ✅ Auto-redirect if on "/" (landing) and already subscribed
        if (location.pathname === "/") {
          navigate(is_subscribed ? "/chat" : "/subscribe");
        }
      } catch (err) {
        console.warn("Not logged in or subscription check failed");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
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
