import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("_ptxn");

    if (transactionId && window.Paddle) {
      window.Paddle.Checkout.open({ transactionId });
    } else {
      navigate("/"); // If no transaction, redirect home
    }
  }, [navigate]);

  return (
    <div style={{ color: "#fff", textAlign: "center", marginTop: "4rem" }}>
      Loading checkout, please wait...
    </div>
  );
}
