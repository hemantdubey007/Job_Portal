import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, jobPost } from "../controller/jobcontroller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,jobPost);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjob").get(isAuthenticated,getAdminJob);
router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;