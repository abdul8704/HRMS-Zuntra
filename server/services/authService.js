const User = require("../models/userDetails.js")
const bcrypt = require('bcrypt')
require('dotenv').config()

const verifyLogin = async (email, password) => {
    try{
        const userData = await User.findOne({ email: email })
        if(!userData)
            return res.status(404).json({ success: false, message: "User not found"})
        
        const verify = await bcrypt.compare(password, userData.passwordHash);
        if(!verify){
            return res.status(401).json({ success: false, message: "Wrong Password"})
        }

        return { success: true, userid: userData.userid, message: "credentials matched." }
    }catch(err){
        return { success: false, message: err.message }
    }
}

const addNewUser = async (userData) => {
    const { username, email, password, phoneNum } = userData;

    const hashedpass = await bcrypt.hash(
        password,
        Number(process.env.HASH_SALT)
    );

    const newUser = new User({
        username: username,
        userid: email,
        email: email,
        passwordHash: hashedpass, // In a real application, hash the password
        profilePicture:
            "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png", // Default or placeholder image
        role: "dev", // Default role
        phoneNumber: phoneNum
    });

    await newUser.save();

    const unique_id = await User.findOne({ email: email });

    await User.updateOne(
        { email: email },
        {
            $set: {
                userid: unique_id._id,
            },
        }
    );
    return {
        success: true,
        message: "User registered successfully.",
        userid: unique_id._id,
    };
}
module.exports = {
    verifyLogin,
    addNewUser
};