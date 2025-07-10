import axios from "axios";

const API = axios.create({
  baseURL: "https://entrepreneur-bot-backend.onrender.com",
  withCredentials: true, // for sending refresh token cookies
});

// ✅ Attach access token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Auto-refresh token and retry once on 401
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token using cookie
        const res = await axios.post(
          "https://entrepreneur-bot-backend.onrender.com/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.access_token;
        localStorage.setItem("token", newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshErr) {
        console.warn("❌ Refresh token failed:", refreshErr.response?.data);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

// ----- AUTHENTICATED CHAT SESSION ROUTES -----

export const startSession = async (title = "Untitled Session") => {
  const res = await API.post("/chat/start-session", { title });
  return res.data.session_id;
};

export const sendMessageToSession = async (session_id, prompt) => {
  const res = await API.post("/chat/send-message", { session_id, prompt });
  return res.data.reply;
};

export const getSessions = async () => {
  const res = await API.get("/chat/sessions");
  return res.data.sessions;
};

export const getMessagesForSession = async (session_id) => {
  const res = await API.get(`/chat/messages/${session_id}`);
  return res.data.messages;
};

export default API;
