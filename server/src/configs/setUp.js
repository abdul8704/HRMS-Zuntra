const User = require("../models/userCredentials");
const Role = require("../models/roles");
const bcrypt = require("bcrypt");
const constants = require("../constants/appConstants")
require("dotenv").config();

const createDefaultAdmin = async () => {
    try {
        const defaultRole = new Role({
            role: process.env.DEFAULT_ADMIN_ROLE || "CEO",
            allowedAccess: constants.ROLE_PERMISSIONS,
        });
        await defaultRole.save();

        const ceo = await Role.findOne({ role: "CEO" });
        const hashedpass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 
            Number(process.env.HASH_SALT) || 10);
            
        const defaultAdmin = new User({
            username: "admin",
            email: process.env.ADMIN_EMAIL,
            passwordHash: hashedpass,
            role: ceo._id,
        });

        await defaultAdmin.save();
        console.log("Default admin created successfully.");
    } catch (error) {
        console.error("Error creating default admin:", error.message);
    }
};

module.exports = { createDefaultAdmin };
