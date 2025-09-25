// server/routes/employees.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
 const { auth, authorize } = require("../middleware/auth");

router.get("/getEmployees", auth, employeeController.getEmployees);
router.put(
  "/updateEmployee/:id",
  auth,
  authorize("hr"),
  employeeController.updateEmployee
);
router.delete(
  "/deleteEmployee/:id",
  auth,
  authorize("hr"),
  employeeController.deleteEmployee
);

module.exports = router;
