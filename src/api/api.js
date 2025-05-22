import axios from "axios";

const API = axios.create({
  baseURL: "https://entrepreneur-bot-backend.onrender.com",

});

export default API;
