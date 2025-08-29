const Tool = require("../../models/projectManagement/tool");

const getAllTools = async () => {
    return Tool.find({}).lean();
};

const getToolById = async (toolId) => {
    return Tool.findById(toolId).lean();
};

const createTool = async (toolData) => {
    const tool = new Tool(toolData);
    return tool.save();
};

const updateToolById = async (toolId, updateData) => {
    updateData.lastUpdatedAt = new Date();
    return Tool.findByIdAndUpdate(toolId, updateData, { new: true });
};

const deleteToolById = async (toolId) => {
    return Tool.findByIdAndDelete(toolId);
};

module.exports = {
    getAllTools,
    getToolById,
    createTool,
    updateToolById,
    deleteToolById,
};
