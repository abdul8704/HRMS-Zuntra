const UserCreds = require("../models/userCredentials");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/ApiError");

require("dotenv").config();

const verifyLogin = async (email, password) => {
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

    if (!verify) throw new ApiError(400, "Wrong Password");

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
};

const createNewUser = async (userData) => {
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

    try {
        await newUser.save();
    } 
    catch (err) {
        if (err.code === 11000) 
            throw new ApiError(400, "Email already exists");
    
        throw err; // bubble up unexpected error
    }

    return {
        success: true,
        message: "User registered successfully, wait for approval.",
    };
};

const getUserByEmail = async (email) => {
    return await UserCreds.findOne({ email: email });
};

const passwordReset = async (email, password) => {
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

    return { success: true, message: "password changed" };
};

module.exports = {
    verifyLogin,
    createNewUser,
    getUserByEmail,
    passwordReset,
};
