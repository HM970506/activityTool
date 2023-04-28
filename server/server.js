const express = require("express");
const multer = require("multer");
const app = express();

// Set up multer middleware to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// Set up route to handle audio file uploads
app.post("/upload-audio", upload.single("audio"), (req, res) => {
  console.log(req.file);
  res.json({ message: "File uploaded successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
