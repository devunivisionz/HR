// server/middleware/auth.js
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

  const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify token
    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token is not valid" });
  }
};

const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get user from database
      const user = await User.findById(req.user.id);
      //   console.log(user);
      if (!user || !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ error: "Unauthorized access", status: 401 });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
};

module.exports = { auth, authorize };
