const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const cors = require("cors"); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB using the SRV connection string
mongoose
  .connect("mongodb+srv://raja:2003@cluster0.a5zryul.mongodb.net/spice-mania")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
