const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const generateImageRoute = require("./routes/GenerateImage");
const posts = require("./routes/Posts");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:3000",
  "https://mannat-ai-image.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Mannat this side.. 🙋🏻",
  });
});

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not configured");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL.trim(), {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Failed to connect to Mongo DB");
    console.error(error.message);
  }
};

const startServer = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    );
    connectDB();
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
