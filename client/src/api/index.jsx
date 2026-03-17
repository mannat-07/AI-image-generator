import axios from "axios";

// Determine the API base URL
const rawApiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

// Create base axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetPosts = async () => {
  return await API.get("/api/post/");
};

export const CreatePost = async (data) => {
  return await API.post("/api/post/", data);
};

export const GenerateImageFromPrompt = async (data) => {
  return await API.post("/api/generateImage/", data);
};
