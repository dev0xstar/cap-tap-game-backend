"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvite = void 0;
const sendInvite = async (req, res) => {
    try {
        const { inviteLink, user } = req.body;
        if (!inviteLink || !user) {
            return res.status(400).json({ error: 'Missing invite link or user' });
        }
        try {
            let inviteData = { user };
            return res.status(200).json({ stats: 'ok' });
        }
        catch (error) {
            console.error('Error sending invite link:', error);
            res.status(500).json({ error: 'Failed to send invite link' });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.sendInvite = sendInvite;
