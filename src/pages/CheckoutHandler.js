import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutUrl = urlParams.get("_ptxn");

    if (checkoutUrl && checkoutUrl.startsWith("https://pay.paddle.com/checkout/")) {
      window.location.href = checkoutUrl;  // ✅ Redirect to Paddle hosted checkout
    } else {
      navigate("/");  // No valid URL, go home
    }
  }, [navigate]);

  return (
    <div style={{ color: "#fff", textAlign: "center", marginTop: "4rem" }}>
      Redirecting to checkout, please wait...
    </div>
  );
}
