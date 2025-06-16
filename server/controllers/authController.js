const authService = require("../services/authService")
const employeeService = require("../services/employeeService")

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
            return res.status(400).json({ success: false, message: "invalid input" })
    
    const verifyLogin = await authService.verifyLogin(email, password)

    if(verifyLogin.success === true){
        // TODO: generate and send token

        const userid = verifyLogin.userid;
        await employeeService.markAttendanceOnLogin(userid)
    }

    return res.status(200).json( {success: true, message: "clocked in and attendance marked."})

}

module.exports = {
    handleLogin
}