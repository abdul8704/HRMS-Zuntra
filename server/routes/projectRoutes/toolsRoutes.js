const express = require("express");
const router = express.Router();
const {
    getAllTools,
    getTool,
    createTool,
    updateTool,
    deleteTool,
} = require("../../controllers/projectControllers/toolsController");

// Base: /api/project/tools
router.get("/", getAllTools);
router.get("/:toolId", getTool);
router.post("/", createTool);
router.patch("/:toolId", updateTool);
router.delete("/:toolId", deleteTool);

module.exports = router;
