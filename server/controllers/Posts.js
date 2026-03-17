const Post = require("../models/Posts");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { createError } = require("../error");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ensureDatabaseConnection = () => {
  if (mongoose.connection.readyState !== 1) {
    throw createError(
      503,
      "Database is unavailable right now. Please try again in a moment."
    );
  }
};

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    ensureDatabaseConnection();
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};

// Create new post
const createPost = async (req, res, next) => {
  try {
    ensureDatabaseConnection();
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    return res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    return next(
      createError(error.status, error?.response?.data?.error.message)
    );
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
