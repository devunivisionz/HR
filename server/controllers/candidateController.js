// server/controllers/candidateController.js
const Candidate = require("../models/Candidate");
const Employee = require("../models/Employee");

    exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;
    // Validate input
    if (!name || !email || !phone || !position || !experience || !req.file) {
      return res
        .status(400)
        .json({ error: "Please fill all fields", status: 400 });
    }

    // Create new candidate
    const candidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      resume: req.file.path,
      createdBy: req.user.id,
    });

    await candidate.save();

    res.status(201).json({ candidate, status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Candidate with this email already exists",
        status: 409,
      });
    }

    res.status(500).json({ error: "Server error", status: 500 });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const { status, position, search } = req.query;
    const query = {};

    // Build query based on filters
    if (status) query.status = status;
    if (position) query.position = position;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const candidates = await Candidate.find(query)
      .sort({ createdAt: -1 })
      .populate("createdBy", "email");

    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCandidateStatus = async (req, res) => {
  try {
    const { candidateId, status } = req.body;

    if (!candidateId || !status) {
      return res
        .status(400)
        .json({ message: "candidateId and status are required" });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { status },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // If Selected, create Employee if not already exists
    if (status === "Selected") {
      const existingEmployee = await Employee.findOne({
        email: candidate.email,
      });
      if (!existingEmployee) {
        const employee = new Employee({
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          // status: candidate.status,
          department: "To be assigned", // or pass this from UI/API
          salary: 0, // can be updated later
          createdBy: candidate.createdBy,
        });

        await employee.save();
      }
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating candidate status",
      error: error.message,
    });
  }
};
exports.deleteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!candidateId) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
      candidate: deletedCandidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
