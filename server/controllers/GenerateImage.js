const dotenv = require("dotenv");
const { createError } = require("../error");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

// Setup open ai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to generate Image
const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data.data[0].b64_json;
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};

module.exports = {
  generateImage,
};
