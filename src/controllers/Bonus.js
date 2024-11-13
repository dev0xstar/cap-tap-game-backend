"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonus = void 0;
const Socials_1 = require("../models/Socials");
const User_1 = require("../models/User");
const bonus = async (req, res) => {
    const { user, title, price } = req.body;
    const currentDateTime = new Date();
    try {
        // const recentSocials = await Socials.find({
        //   tg_id: user,
        //   title: title,
        //   date: { $gte: addHours(currentDateTime, -24) },
        // })
        // if (recentSocials.length > 0) {
        //   return res.json({ status: 'error', message: 'You need more time' })
        // }
        const userData = await User_1.User.findOne({ tg_id: user });
        if (!userData) {
            return res
                .status(404)
                .json({ status: "error", message: "User not found" });
        }
        const updatedMount = userData.mount + price;
        const updatedBalance = userData.balance + price;
        await User_1.User.updateOne({ tg_id: user }, { $set: { mount: updatedMount, balance: updatedBalance } });
        const newSocial = new Socials_1.Socials({
            tg_id: user,
            title: title,
            date: currentDateTime,
        });
        await newSocial.save();
        res.json({
            status: "success",
            mount: updatedMount,
            balance: updatedBalance,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.bonus = bonus;
