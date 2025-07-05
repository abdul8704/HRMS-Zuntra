const express = require("express");
const router = express.Router();
const geoLocationController = require("../controllers/geoLocationController");

router.get("/", geoLocationController.getAllBranches);
router.post("/new-branch", geoLocationController.addNewBranch);

module.exports = router;
