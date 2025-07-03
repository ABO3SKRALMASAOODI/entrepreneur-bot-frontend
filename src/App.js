import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Legal from "./pages/legal";
import VerifyCode from "./pages/VerifyCode";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import EnterPassword from "./pages/EnterPassword"; // ✅ Add this
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import PaddleCheckoutPage from "./pages/PaddleCheckoutPage";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/enter-password" element={<EnterPassword />} /> {/* ✅ NEW */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/paddle-checkout" element={<PaddleCheckoutPage />} />
       

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
