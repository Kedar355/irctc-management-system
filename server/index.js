const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // 1) Import cors
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// 2) Use cors() before your routes. Optionally restrict to a specific origin
app.use(
  cors({
    origin: "http://localhost:3001", // or '*' to allow all
  })
);

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
