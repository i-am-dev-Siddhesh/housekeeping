import express from "express";

import { checkApiKey } from "../middlewares/auth";

import { checkAppVersion, checkHash, checkServerHealth } from "../controllers/general.controller";

 
const router = express.Router({ mergeParams: true });

router.route("/").get(checkApiKey, checkServerHealth);
router.route("/app-version").get(checkApiKey, checkAppVersion);
router.route("/hash").post(checkApiKey, checkHash);


export default router;
