const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");
const employeeService = require("../services/employeeService");
const authOTP = require("../models/authOTP");
const generateOTP = require("../utils/generateOTP");
const transporter = require("../utils/sendOTP");
const jwtUtils = require("../utils/generateJWT");

const handleRefreshToken = asyncHandler((req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token not found in cookies",
        });
    }

    const refreshToken = cookies.refreshToken;

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ sucess: false, message: err.message });

        const newToken = jwtUtils.generateToken({ userid: user.userid });
        return res.status(201).json({ sucess: true, token: newToken });
    });
});

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ success: false, message: "invalid input" });

    const verifyLogin = await authService.verifyLogin(email, password);

    if (verifyLogin.success === true) {
        const token = jwtUtils.generateToken(verifyLogin.userData);
        const refreshToken = jwtUtils.generateRefreshToken(verifyLogin.userData);

        const userid = verifyLogin.userData.userid;
        await employeeService.markAttendanceOnLogin(userid);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
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
    
    const newuser = await authService.getUserByEmail(email);

    const payload = {
        username: newuser.username,
        userid: newuser._id,
        role: newuser.role,
    };

    const token = jwtUtils.generateToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
        success: true,
        accessToken: token,
        message: "Signup Successfull",
    });
});

const userExists = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await authService.getUserByEmail(email);
    if (user) {
        res.status(409);
        throw new Error("User Already Exists!!");
    }
    return res.status(200).json({ success: true, messgae: "Good to go" });
});

const sendOTPController = asyncHandler(async (req, res) => {
    const { useremail } = req.body;
    const otp = generateOTP();

    try {
        await authOTP.replaceOne(
            { useremail: useremail },
            {
                useremail: useremail,
                otp: otp,
            },
            { upsert: true }
        );

        await transporter.sendOTP(useremail, otp);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({
            error: "Failed to send OTP",
            details: err.message,
            otp: otp,
        });
    }
});

const verifyOTPController = asyncHandler(async (req, res) => {
    const { useremail, otp } = req.body;
    try {
        const storedOTP = await authOTP.findOne({ useremail: useremail });

        if (storedOTP.otp === Number(otp)) {
            await authOTP.deleteOne({ useremail: useremail });
            return res
                .status(200)
                .json({ message: "OTP verified successfully" });
        }

        return res.status(400).json({ message: "Invalid or expired OTP" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = {
    handleLogin,
    signUpHandler,
    userExists,
    handleRefreshToken,
    sendOTPController,
    verifyOTPController,
};
