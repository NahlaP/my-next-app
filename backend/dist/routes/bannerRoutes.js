"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Banner_1 = __importDefault(require("../models/Banner"));
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.get('/', (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const banners = await Banner_1.default.find({});
    res.json(banners);
}));
exports.default = router;
