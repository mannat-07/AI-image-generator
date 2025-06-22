const dotenv = require("dotenv");
const { createError } = require("../error.js");
const OpenAI = require("openai");

dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate image
const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data[0].b64_json;
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message =
      error?.error?.message || error?.response?.data?.error?.message || error.message;

    next(createError(statusCode, message));
  }
};

module.exports = { generateImage };
