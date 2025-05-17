"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminUserController_1 = require("../controllers/adminUserController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const isAdmin_1 = require("../middleware/isAdmin");
const router = express_1.default.Router();
router.use(authMiddleware_1.verifyToken, isAdmin_1.isAdmin);
router.get('/', adminUserController_1.getAllUsers);
router.get('/:id', adminUserController_1.getUserById);
router.put('/:id', adminUserController_1.updateUser);
router.delete('/:id', adminUserController_1.deleteUser);
exports.default = router;
