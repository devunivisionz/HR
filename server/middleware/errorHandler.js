// server/middleware/errorHandler.js
  const errorHandler = (err, req, res, next) => {
  console.error(err.stack, "ok");

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    return res.status(400).json({ error: errors });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${field} already exists` });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Default server error
  res.status(500).json({ error: "Something went wrong" });
};

module.exports = errorHandler;
