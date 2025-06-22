import axios from "axios";

// Create base axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});


export const GetPosts = async () => {
  return await API.get("/post/");
};

export const CreatePost = async (data) => {
  return await API.post("/post/", data);
};

export const GenerateImageFromPrompt = async (data) => {
  return await API.post("/generateImage/", data);
};
