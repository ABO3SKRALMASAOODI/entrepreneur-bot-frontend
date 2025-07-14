import axios from "axios";

const API = axios.create({
  baseURL: "https://entrepreneur-bot-backend.onrender.com",
  withCredentials: true, 
});

// Include token automatically if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Skip Authorization for these routes:
  if (
    token &&
    !config.url.includes("/auth/refresh-token") &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ----- AUTHENTICATED CHAT SESSION ROUTES -----

// Start a new session
export const startSession = async (title = "Untitled Session") => {
  const res = await API.post("/chat/start-session", { title });
  return res.data.session_id;
};

// Send a message to a session
export const sendMessageToSession = async (session_id, prompt) => {
  const res = await API.post("/chat/send-message", { session_id, prompt });
  return res.data.reply;
};

// Get all sessions for current user
export const getSessions = async () => {
  const res = await API.get("/chat/sessions");
  return res.data.sessions;
};

// Get messages from a specific session
export const getMessagesForSession = async (session_id) => {
  const res = await API.get(`/chat/messages/${session_id}`);

  return res.data.messages;
};

export default API;