import React, { useEffect } from 'react';

export default function PaddleCheckoutContainer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      window.Paddle.Initialize({
        token: 'test_525dbb28620d16a4cd9f286338b'
      });
      window.Paddle.Environment.set('sandbox');

      const urlParams = new URLSearchParams(window.location.search);
      const txn = urlParams.get('_ptxn');

      if (txn) {
        window.Paddle.Checkout.open({
          transactionId: txn,
          successCallback: () => {
            window.location.href = '/chat';
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
