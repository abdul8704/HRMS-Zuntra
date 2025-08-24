// models/Tool.js (master catalog)
const toolSchema = new Schema(
    {
        name: { type: String, required: true },
        vendor: String,
        unitCost: Number,
        currency: String,
        description: String,
        lastUpdatedAt: Date,
    },
    { timestamps: true }
);
module.exports = mongoose.model("Tool", toolSchema);
