"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOdp = void 0;
const User_1 = require("../models/User");
const updateOdp = async (req, res) => {
    try {
        const { user, odp } = req.body;
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.odp = currentUser?.odp + Number(odp);
            await currentUser.save();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateOdp = updateOdp;
