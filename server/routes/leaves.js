// server/routes/leaves.js
const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { auth, authorize } = require("../middleware/auth");
 const upload = require("../middleware/fileUpload");

router.get("/getLeave", auth, leaveController.getLeaves);
router.post(
  "/createLeave",
  auth,
  upload.single("document"),
  leaveController.createLeave
);
router.put(
  "/updateLeave/:id",
  auth,
  authorize("hr"),
  leaveController.updateLeaveStatus
);

module.exports = router;
