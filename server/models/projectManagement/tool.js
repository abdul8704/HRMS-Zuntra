// models/Tool.js (master catalog)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const toolSchema = new Schema(
    {
        name: { type: String, required: true },
        vendor: String,
        unitCost: Number,
        currency: String,
        description: String,
        expiresOn: Date,
        lastUpdatedAt: Date,
    },
    { timestamps: true }
);
module.exports = mongoose.model("Tool", toolSchema);
