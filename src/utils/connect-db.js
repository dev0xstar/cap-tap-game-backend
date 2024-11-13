"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
require("dotenv/config");
const mongoose_1 = require("mongoose");
const uri = process.env.MONGODB_URI || "";
const connectDb = async () => {
    try {
        const { connections } = await (0, mongoose_1.connect)(uri);
        console.warn(`⚡️[DB]: Name:${connections[0].name}; Port:${connections[0].port}; Host:${connections[0].host};`);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
        console.error("Error occurred while connecting to MongoDB", e);
    }
};
exports.connectDb = connectDb;
