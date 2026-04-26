import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get("/api/v1/jobs", getAllJobs);
// router.get("/api/v1/jobs/:id", getJobById);
// router.post("/api/v1/jobs", createJob);
// router.patch("/api/v1/jobs/:id", editJobById);
// router.delete("/api/v1/jobs/:id", deleteJobById);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route(`/stats`).get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkForTestUser, validateJobInput, validateIdParam, editJobById)
  .delete(checkForTestUser, validateIdParam, deleteJobById);

export default router;
