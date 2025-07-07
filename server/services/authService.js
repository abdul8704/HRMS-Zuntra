const UserCreds = require("../models/userCredentials");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/ApiError");

require("dotenv").config();

const verifyLogin = async (email, password) => {
    try {
        const userData = await UserCreds.findOne(
            { email: email },
            {
                _id: 1,
                username: 1,
                role: 1,
                profilePicture: 1,
                passwordHash: 1,
            }
        );
        if (!userData) 
            throw new ApiError(400, "User not found with this email");

        const verify = await bcrypt.compare(password, userData.passwordHash);

        if (!verify) 
            throw new ApiError(400, "Wrong Password");
        return {
            success: true,
            message: "credentials matched.",
            userData: {
                username: userData.username,
                userid: userData._id,
                role: userData.role,
                profilePicture: userData.profilePicture,
            },
        };
    } catch (err) {
        throw new ApiError(500, "Failed to verify login", err.message);
    }
};

const createNewUser = async (userData) => {
    try {
        const { username, email, password, phoneNum } = userData;

        const hashedpass = await bcrypt.hash(
            password,
            Number(process.env.HASH_SALT)
        );

        const newUser = new UserCreds({
            username: username,
            email: email,
            passwordHash: hashedpass,
            phoneNumber: phoneNum,
        });

        await newUser.save();

        return {
            success: true,
            message: "User registered successfully, wait for aproval.",
        };
    } catch (err) {
        throw new ApiError(500, "Failed to create user", err.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const userData = await UserCreds.findOne({ email: email });
        return userData;
    } catch (err) {
        throw new ApiError(500, "Failed to get user by email", err.message);
    }
};

const passwordReset = async (email, password) => {
    try {
        const hashedpass = await bcrypt.hash(
            password,
            Number(process.env.HASH_SALT)
        );

        await UserCreds.updateOne(
            { email: email },
            {
                passwordHash: hashedpass,
            }
        );

        return { success: true, message: "pass changed" };
    } catch (err) {
        throw new ApiError(500, "Failed to reset password", err.message);
    }
};

module.exports = {
    verifyLogin,
    createNewUser,
    getUserByEmail,
    passwordReset,
};
