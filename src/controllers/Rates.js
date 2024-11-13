"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRateDate = exports.updateRates = exports.getRates = void 0;
const Rates_1 = require("../models/Rates");
const User_1 = require("../models/User");
const getRates = async (req, res) => {
    try {
        const rates = await Rates_1.Rates.find();
        res.status(200).json(rates);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getRates = getRates;
const updateRates = async (req, res) => {
    try {
        const { title, ocicat, odp, otp } = req.body;
        const currentDateTime = new Date();
        const rates = await Rates_1.Rates.findOneAndUpdate({ title }, { ocicat, odp, otp, title, updatedAt: currentDateTime }, { new: true });
        res.status(200).json(rates);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateRates = updateRates;
const updateRateDate = async (req, res) => {
    try {
        const { user } = req.body;
        const currentDateTime = new Date();
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.rate_date = currentDateTime;
            currentUser.tg_id = user;
            await currentUser.save();
        }
        res.status(200).json(currentUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.updateRateDate = updateRateDate;
