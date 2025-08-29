const Tool = require("../../models/projectManagement/tool");
const Phase = require("../../models/projectManagement/phase");

const getAllTools = async () => {
    return Tool.find({}).sort({ expiresOn: -1 }).lean();
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
    await Phase.updateMany(
        { "tools.tool": toolId },
        { $pull: { tools: { tool: toolId } } }
    );
    return Tool.findByIdAndDelete(toolId);
};

module.exports = {
    getAllTools,
    getToolById,
    createTool,
    updateToolById,
    deleteToolById,
};
