const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const candidateRoutes = require("./routes/candidates");
const employeeRoutes = require("./routes/employees");
const leaveRoutes = require("./routes/leaves");
const errorHandler = require("./middleware/errorHandler");
 require("dotenv").config();

const app = express();

// ✅ Correct CORS setup at the top
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fanciful-toffee-5ef34c.netlify.app",
      "https://musical-gecko-91effd.netlify.app",
      "https://preeminent-yeot-2fe2f5.netlify.app",
      "https://singular-chaja-fff6a7.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.download(filePath);
});

// Error handler
app.use(errorHandler);
app.all("/{*any}", (req, res, next) => {});

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
