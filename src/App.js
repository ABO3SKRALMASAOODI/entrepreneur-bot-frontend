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
    const checkAuthAndMaybeRedirect = async () => {
      try {
        let token = localStorage.getItem("token");

        // Try refreshing token if missing
        if (!token) {
          const res = await axios.post(
            "https://entrepreneur-bot-backend.onrender.com/auth/refresh-token",
            {},
            { withCredentials: true }
          );
          token = res.data.access_token;
          localStorage.setItem("token", token);
        }

        // If we’re on "/", check subscription
        if (location.pathname === "/") {
          const subRes = await axios.get(
            "https://entrepreneur-bot-backend.onrender.com/auth/status/subscription",
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true
            }
          );

          const { is_subscribed } = subRes.data;

          // ✅ Redirect ONLY if user is subscribed
          if (is_subscribed) {
            navigate("/chat");
          }
        }
      } catch (err) {
        // Not logged in or token failed — that’s okay, just stay on landing
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndMaybeRedirect();
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
