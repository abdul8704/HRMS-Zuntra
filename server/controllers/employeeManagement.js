const employeeService = require("../services/employeeService")

const handleLogout = async (req, res) => {
    const { userid } = req.user;
    const { logoutTime } = req.body;

    await employeeService.markEndOfSession(userid, logoutTime);
    res.status(200).json({ success: true, message: "Logout time recorded" });
}

module.exports = {
    handleLogout
}