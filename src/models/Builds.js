"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builds = void 0;
const mongoose_1 = require("mongoose");
const buildsSchema = new mongoose_1.Schema({
    tg_id: { type: String },
    tg_name: { type: String },
    date: { type: Date },
    level: { type: Number, default: 1 },
});
exports.Builds = (0, mongoose_1.model)('Builds', buildsSchema);
