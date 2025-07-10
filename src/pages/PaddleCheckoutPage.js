import React, { useEffect } from 'react';

export default function PaddleCheckoutPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      window.Paddle.Environment.set('sandbox');  // Keep only in sandbox/testing
      window.Paddle.Initialize({
        token: 'test_525dbb28620d16a4cd9f286338b'
      });

      // 💡 Set the user's email from localStorage (auto-prefill email)
      const userEmail = localStorage.getItem("user_email");
      if (userEmail) {
        window.Paddle.Customer.set({
          email: userEmail
        });
      }

      const urlParams = new URLSearchParams(window.location.search);
      const txn = urlParams.get('_ptxn');

      if (txn) {
        window.Paddle.Checkout.open({
          transactionId: txn,
          settings: {
            variant: 'one-page', // ✅ makes it faster/smoother
            successUrl: 'https://thehustlerbot.com/chat'
          }
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Secure Checkout</h1>
      <p>Please wait while we prepare your checkout...</p>
    </div>
  );
}
