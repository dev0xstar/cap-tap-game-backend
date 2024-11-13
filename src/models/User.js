"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
//         tgid VARCHAR(255) UNIQUE NOT NULL,
//         mount NUMERIC DEFAULT 0,
//         balance NUMERIC DEFAULT 0,
//         point_level INT DEFAULT 1,
//         energy_level INT DEFAULT 1,
//         total_reward NUMERIC DEFAULT 0,
//         friendid VARCHAR(255),
//         date TIMESTAMP,
//         full_energy INT DEFAULT 6,
//         publickey VARCHAR(255),
//         privatekey TEXT,
//         ratedate TIMESTAMP,
//         energy NUMERIC DEFAULT 0,
//         odp NUMERIC DEFAULT 0,
//         username VARCHAR(255)
const userSchema = new mongoose_1.Schema({
    tg_id: { type: String, unique: true, required: true },
    mount: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    point_level: { type: Number, default: 1 },
    energy_level: { type: Number, default: 1 },
    total_reward: { type: Number, default: 0 },
    friend_ids: [{ type: String }],
    date: { type: Date },
    full_energy: { type: Number, default: 6 },
    public_key: { type: String },
    private_key: { type: String },
    rate_date: { type: Date },
    energy: { type: Number, default: 0 },
    odp: { type: Number, default: 0 },
    username: { type: String },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
