const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesControllers")

router.get("/", rolesController.getAllroles)

module.exports = router;
