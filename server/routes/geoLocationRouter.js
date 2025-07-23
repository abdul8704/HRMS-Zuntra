const express = require("express");
const router = express.Router();
const geoLocationController = require("../controllers/geoLocationController");
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");

// public routes
router.get("/", requirePermission("general"), geoLocationController.getAllBranches);

//private routes
router.post("/new-branch", requirePermission("companyManagement"), geoLocationController.addNewBranch);

module.exports = router;

// TODO: write patch req for a branch
