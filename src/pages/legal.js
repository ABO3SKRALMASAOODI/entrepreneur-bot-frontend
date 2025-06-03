import React from "react";
import { useNavigate } from "react-router-dom";

function Legal() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <button onClick={() => navigate(-1)} style={backButton}>← Back</button>

      <div style={content}>
        <h1 style={title}>About The Hustler Bot</h1>
        <p style={paragraph}>
          The Hustler Bot is an AI-powered chatbot developed by DIYAR TAREQ TRADING L.L.C to help aspiring and experienced entrepreneurs build successful businesses and strategies...
        </p>

        <h1 style={title}>Privacy Policy</h1>
        <p style={paragraph}><strong>What we collect:</strong> When you sign up or interact with our platform...</p>
        <p style={paragraph}><strong>How we use your data:</strong> Your information helps us verify your access...</p>
        <p style={paragraph}><strong>Security:</strong> Your data is securely stored, encrypted...</p>
        <p style={paragraph}><strong>Want your data deleted or changed?</strong> Email us at <a href="mailto:support@thehustlerbot.com" style={link}>support@thehustlerbot.com</a>.</p>

        <h1 style={title}>Terms of Use</h1>
        <p style={paragraph}><strong>Fair use:</strong> You can use the chatbot for your own personal or business productivity...</p>
        <ul style={list}>
          <li>No spamming or flooding the system with requests</li>
          <li>No scraping, hacking, or reverse engineering</li>
          <li>No attempts to trick the system into producing dangerous content</li>
        </ul>
        <p style={paragraph}><strong>Disclaimer:</strong> The chatbot is powered by AI and generates content automatically...</p>

        <h1 style={title}>Refund Policy</h1>
        <p style={paragraph}><strong>Refunds are granted if requested within 14 days:</strong></p>
        <ul style={list}>
          <li>You were charged incorrectly or multiple times</li>
          <li>You paid but couldn’t access the service</li>
          <li>Key features promised were not available</li>
        </ul>
        <p style={paragraph}><strong>Refunds are not granted if:</strong></p>
        <ul style={list}>
          <li>You used the service and changed your mind</li>
          <li>You expected different results</li>
          <li>You forgot to cancel your subscription</li>
        </ul>
        <p style={paragraph}>
          To request a refund, email <a href="mailto:support@thehustlerbot.com" style={link}>support@thehustlerbot.com</a>. 
        </p>
      </div>
    </div>
  );
}

// 🌙 Styled Components

const container = {
  backgroundColor: "#000",
  color: "#eee",
  fontFamily: "Segoe UI, sans-serif",
  minHeight: "100vh",
  padding: "2rem",
  overflowY: "auto",
};

const content = {
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#111",
  borderRadius: "1.5rem",
  padding: "2rem",
  boxShadow: "0 0 40px rgba(0,0,0,0.7)",
};

const title = {
  fontSize: "1.6rem",
  color: "#fff",
  marginTop: "2rem",
};

const paragraph = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#ccc",
  marginBottom: "1rem",
};

const list = {
  paddingLeft: "1.5rem",
  marginBottom: "1rem",
  color: "#ccc",
  lineHeight: "1.6",
};

const link = {
  color: "#f66",
  textDecoration: "underline",
};

const backButton = {
  backgroundColor: "#8b0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "10px 18px",
  fontSize: "1rem",
  cursor: "pointer",
  marginBottom: "2rem",
};

export default Legal;
