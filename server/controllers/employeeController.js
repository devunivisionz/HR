// server/controllers/employeeController.js
const Employee = require("../models/Employee");

    exports.getEmployees = async (req, res) => {
  try {
    const { department, position, leaveStatus, search } = req.query;
    const query = {};

    if (department) query.department = department;
    if (position) query.position = position;
    if (leaveStatus) query.leaveStatus = leaveStatus;
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const employees = await Employee.find(query)
      .sort({ joiningDate: -1 })
      .populate("createdBy", "email");

    res.json({ employees, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    console.log(employee);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
