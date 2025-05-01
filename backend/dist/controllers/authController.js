"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your environment variables.');
}
const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        await User_1.default.create({ name, email, password: hashed });
        res.status(201).json({ message: 'User registered' });
    }
    catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        console.log('User from DB:', user); // Log the full user object
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log('Entered Password:', password); // Log the entered password
        console.log('Hashed Password in DB:', user.password); // Log the stored hash
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, } });
    }
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Login failed', error: err });
    }
};
exports.login = login;
