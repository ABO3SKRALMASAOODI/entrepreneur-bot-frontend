import { useEffect } from 'react';

export default function PaddleCheckoutPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ptxn = urlParams.get('_ptxn');

    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      window.Paddle.Initialize({ token: 'live_dcf6d3e20a0df8006f9462d419f' });

      if (ptxn) {
        // Paddle auto-detects _ptxn and opens checkout, but to be safe:
        console.log('Opening Paddle Checkout with _ptxn:', ptxn);
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
