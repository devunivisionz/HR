// server/routes/candidates.js
const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const { auth, authorize } = require("../middleware/auth");
 const upload = require("../middleware/fileUpload");

router.post(
  "/createCandidate",
  auth,
  authorize("hr"),
  upload.single("resume"),
  candidateController.createCandidate
);
router.get("/getCandidate", auth, candidateController.getCandidates);
// router.post(
//   "/:id/hire",
//   auth,
//   authorize("hr"),
//   candidateController.hireCandidate
// );
router.put(
  "/updateCandidateStatus",
  auth,
  authorize("hr"),
  candidateController.updateCandidateStatus
);
router.delete(
  "/deleteCandidate/:candidateId",
  auth,
  authorize("hr"),
  candidateController.deleteCandidate
);

module.exports = router;
