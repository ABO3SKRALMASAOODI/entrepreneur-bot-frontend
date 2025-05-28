// components/SubscribeModal.js
import React from "react";

function SubscribeModal({ visible, onClose, checkoutUrl }) {
  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", maxWidth: "500px" }}>
        <h2>Unlock Full Access</h2>
        <p>Subscribe to HustlerBot and get expert AI business strategy help tailored to entrepreneurs.</p>
        <p><strong>$20/month</strong> – cancel anytime.</p>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => window.location.href = checkoutUrl} style={{
            background: "#6753ea", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px"
          }}>
            Proceed to Checkout
          </button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeModal;
