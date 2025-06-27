const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesControllers")

router.get("/", rolesController.getAllroles)
router.get("/:roleName", rolesController.getRoleDetails);  
router.post("/new-role", rolesController.addNewRole);
router.put("/:roleName", rolesController.editRole);  
router.delete("/:roleName", rolesController.deleteRole); 

module.exports = router;
