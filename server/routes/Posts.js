const express = require("express");
const { createPost, getAllPosts } = require("../controllers/Posts");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;
