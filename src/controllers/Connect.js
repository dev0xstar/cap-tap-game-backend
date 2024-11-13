"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const User_1 = require("../models/User");
const casper_js_sdk_1 = require("casper-js-sdk");
const connect = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: "Missing user_id or friend_id" });
        }
        const user = await User_1.User.findOne({ tg_id: user_id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.public_key || !user.private_key) {
            const keyPair = casper_js_sdk_1.Keys.Ed25519.new();
            const _privateKey = keyPair.exportPrivateKeyInPem();
            await User_1.User.updateOne({ tg_id: user_id }, { $set: { public_key: keyPair.accountHex(), private_key: _privateKey } });
            return res.status(200).json({
                public_key: keyPair.accountHex(),
                private_key: _privateKey,
            });
        }
        else {
            return res.status(200).json({
                public_key: user.public_key,
                private_key: user.private_key,
            });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.connect = connect;
