"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rates = void 0;
const mongoose_1 = require("mongoose");
const ratesSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, required: true },
    ocicat: { type: Number, default: 0 },
    odp: { type: Number, default: 0 },
    otp: { type: Number, default: 0 },
    date: { type: Date },
});
exports.Rates = (0, mongoose_1.model)('Rates', ratesSchema);
