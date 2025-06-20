const UserCreds = require("../models/userCredentials");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

require("dotenv").config();

const verifyLogin = asyncHandler(async (email, password) => {
    try {
        const userData = await UserCreds.findOne(
            { email: email },
            {
                _id: 1,
                username: 1,
                role: 1,
                passwordHash: 1,
            }
        );
        if (!userData) return { success: false, message: "User not found" };

        const verify = await bcrypt.compare(password, userData.passwordHash);

        if (!verify) return { success: false, message: "Wrong Password" };

        return {
            success: true,
            message: "credentials matched.",
            userData: {
                username: userData.username,
                userid: userData._id,
                role: userData.role,
            },
        };
    } catch (err) {
        return { success: false, message: err.message };
    }
});

const createNewUser = asyncHandler(async (userData) => {
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
});

const getUserByEmail = async (email) => {
    const userData = UserCreds.findOne({ email: email });
    return userData;
};

module.exports = {
    verifyLogin,
    createNewUser,
    getUserByEmail,
};
