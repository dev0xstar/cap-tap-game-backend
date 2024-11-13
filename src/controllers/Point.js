"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upPoint = void 0;
const User_1 = require("../models/User");
const upPoint = async (req, res) => {
    const { user } = req.body;
    try {
        const userData = await User_1.User.findOne({ tg_id: user });
        if (!userData) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        await User_1.User.updateOne({ tg_id: user }, { $set: { point_level: userData.point_level + 1 } });
        return res.json({ status: 'success', message: 'Point updated' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.upPoint = upPoint;
