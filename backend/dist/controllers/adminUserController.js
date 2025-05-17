"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        const mappedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.isAdmin ? 'admin' : 'user',
        }));
        res.status(200).json(mappedUsers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.isAdmin ? 'admin' : 'user',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const { name, email, role } = req.body;
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (role)
            user.isAdmin = role === 'admin';
        await user.save();
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.isAdmin ? 'admin' : 'user',
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
