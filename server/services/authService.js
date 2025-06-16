const User = require("../models/userDetails.js")
const bcrypt = require('bcrypt')
require('dotenv').config()

const verifyLogin = async (email, password) => {
    try{
        const userData = User.findOne({ email: email })
        if(!userData)
            return res.status(404).json({ success: false, message: "User not found"})
        
        const verify = await bcrypt.compare(password, userData.passwordHash);
        if(!verify){
            return res.status(401).json({ success: false, message: "Wrong Password"})
        }

        return res.status(200).json({ success: true, userid: userData.userid, message: "credentials matched." })
    }catch(err){
        res.status(500).json({ success: false, message: err.message })
    }
}

const addNewUser = async (userData) => {
    const newUser = {
        username: userData.username,
        
    }
}
module.exports = {
    verifyLogin
}