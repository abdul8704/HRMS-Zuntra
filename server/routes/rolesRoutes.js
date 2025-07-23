const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesControllers")
const { requirePermission, requireAdminOrMe } = require("../middlewares/requirePermission");


router.get("/", requirePermission("employeeManagement"), rolesController.getAllroles)
router.get("/:roleid", requirePermission("employeeManagement"), rolesController.getRoleDetails);  
router.post("/new-role", requirePermission("employeeManagement"), rolesController.addNewRole);
router.put("/:roleName", requirePermission("employeeManagement"), rolesController.editRole);  
router.delete("/:roleName", requirePermission("employeeManagement"), rolesController.deleteRole); 

module.exports = router;
