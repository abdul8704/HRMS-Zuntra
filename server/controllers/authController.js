const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");
const employeeService = require("../services/employeeService");
const authOTP = require("../models/authOTP");
const generateOTP = require("../utils/generateOTP");
const transporter = require("../utils/sendOTP");
const jwtUtils = require("../utils/generateJWT");
const GeoService = require("../services/geoLocationService")
const User = require("../services/user")

const ApiError = require("../errors/ApiError");


const handleRefreshToken = asyncHandler((req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken)
        throw new ApiError(401, "Refresh token not found in cookies");

    const refreshToken = cookies.refreshToken;

    try {
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const newToken = jwtUtils.generateToken({ userid: user.userid });
        return res.status(201).json({ success: true, token: newToken });
    } 
    catch (err) {
        throw new ApiError(403, "Invalid or expired refresh token", err.message);
    }
});

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new ApiError(401, "Provide credentials!!");

    const verifyLogin = await authService.verifyLogin(email, password);

    if (verifyLogin.success === true) {
        const token = jwtUtils.generateToken(verifyLogin.userData);
        const refreshToken = jwtUtils.generateRefreshToken(verifyLogin.userData);

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
    } 
    else if (verifyLogin.message === "Wrong Password") 
        throw new ApiError(401, "Wrong Password");

    else if (verifyLogin.message === "User not found") 
        throw new ApiError(401, "User not found");
    else 
        throw new ApiError(500, "IDK what went wrong. Internal Server Error", { reason: err.message });
});

const geoFenceLogin = asyncHandler(async (req, res) => {
    const { latitude, longitude, email } = req.body;
    const user = await authService.getUserByEmail(email)
    const userid = user._id;

    if(!user)
        throw new ApiError(404, "User not found");

    if (!email || !latitude || !longitude || !user.campus)
        throw new ApiError(400, "Incomplete location data");

    const isInsideGeofence = await GeoService.isWithinGeofence(
        latitude,
        longitude,
        user.campus
    );

    if(isInsideGeofence)
        await employeeService.markAttendanceOnLogin(userid, "onsite");
    else
        await employeeService.markAttendanceOnLogin(userid, "remote");

    res.status(200).json({ success: true, message: "Attendance marked" });
})

const signUpHandler = asyncHandler(async (req, res) => {
    const { email, password, username, phoneNum } = req.body;

    if (!username || !email || !password || !phoneNum) 
        throw new ApiError(400, "Username, email, password, and phone number are required.");
    
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
    if (user) 
        return res.status(200).json({ success: true, exists: true });
    
    return res.status(200).json({ success: true, exists: false });
});

const sendOTPController = asyncHandler(async (req, res) => {
    console.log(req.body)
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
        throw new ApiError(500, "Failed to send OTP", err.message);
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

        throw new ApiError(400, "Invalid or expired OTP");
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = {
    handleLogin,
    geoFenceLogin,
    signUpHandler,
    userExists,
    handleRefreshToken,
    sendOTPController,
    verifyOTPController,
};
