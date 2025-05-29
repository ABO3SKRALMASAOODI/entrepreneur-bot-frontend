import React from "react";

function Legal() {
  return (
    <div
      style={{
        maxWidth: "800px",
        height: "90vh",
        overflowY: "scroll",
        margin: "auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your data when you use our chatbot.
      </p>
      <p>
        <strong>Data We Collect:</strong> We collect your email address, payment status, and usage logs strictly for authentication and support. No conversation data is stored unless explicitly stated.
      </p>
      <p>
        <strong>How We Use Your Data:</strong> Your data is used solely to manage subscriptions, provide access control, and improve service quality. We do not sell or share your information with third parties.
      </p>
      <p>
        <strong>Security:</strong> All data is stored securely with encryption, and access is restricted to essential personnel only.
      </p>
      <p>
        <strong>Contact:</strong> You may request data deletion or modification by contacting <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
      </p>

      <h1>Terms of Use</h1>
      <p>
        By using this chatbot, you agree to these terms and conditions. If you do not agree, you must not use the service.
      </p>
      <p>
        <strong>License:</strong> You are granted a limited, non-transferable, non-exclusive license to access and use the chatbot for personal or business learning.
      </p>
      <p>
        <strong>Restrictions:</strong> You may not misuse the chatbot for illegal, abusive, or malicious purposes. Reverse engineering, data harvesting, or generating false financial claims is prohibited.
      </p>
      <p>
        <strong>Disclaimer:</strong> The chatbot is provided “as is” with no warranties. We do not guarantee accuracy of generated content. You assume responsibility for decisions made based on its output.
      </p>
      <p>
        <strong>Termination:</strong> We reserve the right to suspend access if misuse is detected or payments are declined.
      </p>

      <h1>Refund Policy</h1>
      <p>
        We offer subscriptions to access premium features of the chatbot. All purchases are considered final unless covered by the exceptions below.
      </p>
      <p>
        <strong>Eligible Refunds:</strong> We may issue a refund within 7 days if:
        <ul>
          <li>You were charged incorrectly</li>
          <li>You experienced technical issues that prevented use</li>
          <li>You did not receive access after payment</li>
        </ul>
      </p>
      <p>
        <strong>How to Request:</strong> Email <a href="mailto:billing@yourdomain.com">billing@yourdomain.com</a> with your account email and payment ID. All refund decisions are final and at our discretion.
      </p>
      <p>
        <strong>Recurring Payments:</strong> Subscriptions automatically renew unless canceled before the next billing cycle. You may cancel anytime via your account.
      </p>
    </div>
  );
}

export default Legal;
