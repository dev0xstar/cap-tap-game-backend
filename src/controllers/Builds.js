"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuilds = void 0;
const Builds_1 = require("../models/Builds");
const getBuilds = async (req, res) => {
    try {
        const builds = await Builds_1.Builds.find();
        res.status(200).json(builds);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getBuilds = getBuilds;
