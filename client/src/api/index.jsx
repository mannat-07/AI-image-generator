import axios from "axios";

// Determine the API base URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

// Create base axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetPosts = async () => {
  return await API.get("api/post/");
};

export const CreatePost = async (data) => {
  return await API.post("/post/", data);
};

export const GenerateImageFromPrompt = async (data) => {
  console.log("API call data:", data);
  return await API.post("/generateImage/", data);
};
