// server/controllers/leaveController.js
const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

   exports.getLeaves = async (req, res) => {
  try {
    const { employee, leaveDate, status, search } = req.query;
    const query = {};

    // Always filter by approved status

    // Optional: filter by employee
    if (employee) query.employee = employee;

    // Optional: filter by leaveDate
    if (leaveDate) {
      query.status = "approved";

      const dateObj = new Date(leaveDate);
      const nextDay = new Date(dateObj);
      nextDay.setDate(dateObj.getDate() + 1);

      query.leaveDate = {
        $gte: dateObj,
        $lt: nextDay,
      };
    }
    if (status) {
      query.status = status;
    }

    let leaves = await Leave.find(query)
      .populate("employee", "name position")
      .populate("approvedBy", "email")
      .sort({ leaveDate: -1 });

    if (search) {
      const searchLower = search.toLowerCase();
      leaves = leaves.filter((leave) =>
        leave.employee?.name?.toLowerCase().includes(searchLower)
      );
    }

    res.json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createLeave = async (req, res) => {
  try {
    const { designation, leaveDate, reason, id } = req.body;

    if (!designation || !leaveDate || !reason || !id) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // Fetch employee
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ error: "Employee Not Found" });
    }

    // ✅ Check if employee is present today
    if (employee.leaveStatus !== "Present") {
      return res.status(400).json({
        error: "Leave can only be created if employee is present today.",
      });
    }
    console.log(req.file);
    // Create leave
    const leave = new Leave({
      employee: id,
      designation,
      leaveDate,
      reason,
      document: req.file?.path,
    });

    await leave.save();

    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate input
    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update leave status
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy: req.user.id,
      },
      { new: true }
    )
      .populate("employee", "name position") // Optional: populate employee details
      .populate("approvedBy", "email"); // Optional: populate approver email

    if (!leave) {
      return res.status(404).json({ error: "Leave not found" });
    }

    res.json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
