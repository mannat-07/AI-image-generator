const axios = require("axios");
const dotenv = require("dotenv");
const { createError } = require("../error.js");
const FormData = require("form-data");

dotenv.config();

const generateImage = async (req, res, next) => {
  if (!process.env.STABILITY_API_KEY) {
    return next(createError(500, "Server configuration error: Missing API Key."));
  }
  
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return next(
        createError(400, "Prompt is required and must be a non-empty string.")
      );
    }

    const form = new FormData();
    form.append("prompt", prompt);
    form.append("output_format", "jpeg");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      form,
      {
        responseType: "arraybuffer",
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );

    const base64Image = Buffer.from(response.data).toString("base64");

    if (!base64Image) {
      return next(createError(500, "Image not returned from Stability AI."));
    }

    res.status(200).json({ photo: `data:image/jpeg;base64,${base64Image}` });
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      (error.response?.data?.errors && error.response.data.errors.join(", ")) ||
      "An unknown error occurred while generating the image.";

    next(createError(statusCode, message));
  }
};

module.exports = { generateImage };