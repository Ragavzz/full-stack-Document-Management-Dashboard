const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload PDF files
app.post("/api/upload", upload.array("files"), (req, res) => {
  res.json({
    success: true,
    uploadedFiles: req.files,
  });
});

// Get uploaded files
app.get("/api/files", (req, res) => {
  try {
    const files = fs.readdirSync("uploads");
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch files",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});