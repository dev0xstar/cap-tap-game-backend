"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriends = void 0;
const User_1 = require("../models/User");
const getFriends = async (req, res) => {
    const { user } = req.body;
    try {
        const friends = await User_1.User.find({
            friend_ids: { $all: [user] },
        });
        console.log(friends);
        res.status(200).json({ items: friends });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.getFriends = getFriends;
