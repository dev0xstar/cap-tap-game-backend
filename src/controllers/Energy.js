"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnergy = exports.upEnergy = void 0;
const User_1 = require("../models/User");
const upEnergy = async (req, res) => {
    const { user } = req.body;
    try {
        const userData = await User_1.User.findOne({ tg_id: user });
        if (!userData) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        await User_1.User.updateOne({ tg_id: user }, { $set: { point_level: userData.energy_level + 1 } });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.upEnergy = upEnergy;
const updateEnergy = async (req, res) => {
    const { user, energy } = req.body;
    try {
        const userData = await User_1.User.findOne({ tg_id: user });
        if (!userData) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        await User_1.User.updateOne({ tg_id: user }, { $set: { energy: userData.energy + Number(energy) } });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.updateEnergy = updateEnergy;
