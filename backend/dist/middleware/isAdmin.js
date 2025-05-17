"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    if (typeof req.user === 'object' && 'isAdmin' in req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: 'Admin access only' });
    }
};
exports.isAdmin = isAdmin;
