"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socials = void 0;
const mongoose_1 = require("mongoose");
const socialsSchema = new mongoose_1.Schema({
    tg_id: { type: String, ref: 'User' },
    title: { type: String },
    date: { type: Date },
});
exports.Socials = (0, mongoose_1.model)('Socials', socialsSchema);
