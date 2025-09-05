const asyncHandler = require("express-async-handler");
const ApiError = require("../../errors/ApiError");
const toolService = require("../../services/projectService/toolService");
// Validations simplified inline per teamController style

const getAllTools = asyncHandler(async (req, res) => {
    const tools = await toolService.getAllTools();
    const now = new Date();
    const withValidity = tools.map((t) => {
        if (!t.expiresOn) return t;
        const exp = new Date(t.expiresOn);
        const diffMs = exp.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (diffMs > 0) {
            return { ...t, validFor: `Valid for ${diffDays} days` };
        }
        return { ...t, expired: `Expired ${Math.abs(diffDays)} days ago` };
    });
    return res.status(200).json({ success: true, data: withValidity });
});

const getTool = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    if (!toolId) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    const tool = await toolService.getToolById(toolId);
    if (!tool) throw new ApiError(404, "Tool not found");
    let response = tool;
    if (tool.expiresOn) {
        const now = new Date();
        const exp = new Date(tool.expiresOn);
        const diffMs = exp.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (diffMs > 0) {
            response = {
                ...tool,
                validFor: `Valid for ${diffDays} days`,
            };
        } else {
            response = {
                ...tool,
                expired: `Expired ${Math.abs(diffDays)} days ago`,
            };
        }
    }
    return res.status(200).json({ success: true, data: response });
});

const createTool = asyncHandler(async (req, res) => {
    const { name, vendor, unitCost, currency, description, expiresOn } =
        req.body || {};

    console.log(req.body);

    if (
        name === undefined ||
        vendor === undefined ||
        unitCost === undefined ||
        currency === undefined ||
        description === undefined
    ) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    let expiresOnISO = undefined;
    if (expiresOn !== undefined && expiresOn !== null && expiresOn !== "") {
        const d = new Date(expiresOn);
        if (isNaN(d.getTime())) {
            throw new ApiError(400, "Invalid 'expiresOn' date format");
        }
        expiresOnISO = d.toISOString();
    }

    const created = await toolService.createTool({
        name,
        vendor,
        unitCost,
        currency,
        description,
        ...(expiresOnISO && { expiresOn: expiresOnISO }),
    });
    return res
        .status(201)
        .json({ success: true, message: "Tool created", data: created });
});

const updateTool = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    const { name, vendor, unitCost, currency, description, expiresOn } =
        req.body || {};

    if (
        !toolId ||
        !name ||
        !vendor ||
        unitCost === undefined ||
        currency === undefined ||
        description === undefined
    ) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    if (
        !name &&
        !vendor &&
        !unitCost &&
        !currency &&
        !description &&
        !expiresOn
    ) {
        throw new ApiError(400, "Please provide some data to update tool");
    }
    const updated = await toolService.updateToolById(toolId, {
        name,
        vendor,
        unitCost,
        currency,
        description,
        expiresOn,
    });
    if (!updated) throw new ApiError(404, "Tool not found");
    return res
        .status(200)
        .json({ success: true, message: "Tool updated", data: updated });
});

const deleteTool = asyncHandler(async (req, res) => {
    const { toolId } = req.params;
    if (!toolId) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    const deleted = await toolService.deleteToolById(toolId);
    if (!deleted) throw new ApiError(404, "Tool not found");
    return res.status(200).json({
        success: true,
        message: "Tool deleted",
        data: { id: deleted._id },
    });
});

module.exports = { getAllTools, getTool, createTool, updateTool, deleteTool };
