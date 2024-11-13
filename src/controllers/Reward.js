"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReward = void 0;
const User_1 = require("../models/User");
const updateReward = async (req, res) => {
    try {
        const { user, upreward } = req.body;
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.total_reward = currentUser?.total_reward + Number(upreward);
            await currentUser.save();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateReward = updateReward;
