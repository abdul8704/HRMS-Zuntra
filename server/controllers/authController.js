const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");
const employeeService = require("../services/employeeService");
const jwtUtils = require("../utils/generateJWT");

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ success: false, message: "invalid input" });

    const verifyLogin = await authService.verifyLogin(email, password);
    console.log(verifyLogin);
    
    if (verifyLogin.success === true) {
        const token = jwtUtils.generateToken(verifyLogin.userData);
        const refreshToken = jwtUtils.generateRefreshToken(
            verifyLogin.userData
        );

        const userid = verifyLogin._id;
        await employeeService.markAttendanceOnLogin(userid);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            accessToken: token,
            message: "Login successful",
        });
    } else if (verifyLogin.message === "Wrong Password") {
        res.status(401);
        throw new Error("Wrong Password");
    } else if (verifyLogin.message === "User not found") {
        res.status(401);
        throw new Error("User not found");
    } else {
        res.status(500);
        throw new Error("IDK what went wrong. Internal Server Error");
    }
});

const signUpHandler = asyncHandler(async (req, res) => {
    const { email, password, username, phoneNum } = req.body;

    if (!username || !email || !password || !phoneNum) {
        return res.status(400).json({
            success: false,
            message: "Username, email, and password are required.",
        });
    }

    await authService.createNewUser(req.body);
    return res.status(201).json({ success: true, message: "DONEE" });
});

const userExists = async (req, res) => {
    const { email } = req.body;
    const user = await authService.getUserByEmail(email);
    if (user) {
        res.status(409);
        throw new Error("User Already Exists!!");
    }
    return res.status(200).json({ success: true, messgae: "Good to go" });
};

module.exports = {
    handleLogin,
    signUpHandler,
    userExists,
};
