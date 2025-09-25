// server/models/Employee.js
const mongoose = require("mongoose");

 const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, default: Date.now },
  task: {
    type: String,
    default: "Not assigned!",
  },
  leaveStatus: {
    type: String,
    enum: ["Present", "Absent", "Medical Leave", "Work from Home"],
    default: "Present",
  },
  status: {
    type: String,
    default: "Selected",
  },
  role: { type: String, enum: ["hr", "employee"], default: "employee" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Employee", employeeSchema);
