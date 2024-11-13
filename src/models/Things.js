"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Things = void 0;
const mongoose_1 = require("mongoose");
const thingsSchema = new mongoose_1.Schema({
    limit: {
        type: Number,
        required: true,
    },
});
exports.Things = (0, mongoose_1.model)("Things", thingsSchema);
