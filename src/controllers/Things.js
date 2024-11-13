"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThings = void 0;
const Things_1 = require("../models/Things");
const getThings = async (req, res) => {
    try {
        const things = await Things_1.Things.find();
        res.status(200).json(things);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getThings = getThings;
