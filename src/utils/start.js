"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const grammy_1 = require("grammy");
const User_1 = require("../models/User");
const Tasks_1 = require("../models/Tasks");
const UserTasks_1 = require("../models/UserTasks");
const start = async (ctx) => {
    const userId = ctx.from.id;
    const received = ctx.match;
    const user = await User_1.User.findOne({ tg_id: userId });
    if (!user) {
        let sender = null;
        if (received) {
            sender = await User_1.User.findOne({ tg_id: received });
        }
        const currentDateTime = new Date();
        const newUser = new User_1.User({
            tg_id: userId,
            mount: ctx.from.is_premium === true ? 70000 : 10000,
            balance: ctx.from.is_premium === true ? 70000 : 10000,
            point_level: 1,
            energy_level: 1,
            total_reward: 0,
            friend_ids: sender ? [sender.tg_id] : [],
            date: currentDateTime,
            username: ctx.from.username || ctx.from.first_name,
        });
        const tasks = await Tasks_1.Tasks.find();
        for (const task of tasks) {
            await UserTasks_1.UserTasks.create({
                tg_id: userId,
                task_id: task._id,
                status: "",
            });
        }
        await newUser.save();
        if (sender) {
            await User_1.User.findOneAndUpdate({ tg_id: received }, {
                $inc: {
                    mount: ctx.from.is_premium === true ? 70000 : 10000,
                    balance: ctx.from.is_premium === true ? 70000 : 10000,
                },
            });
        }
        const menus = new grammy_1.InlineKeyboard().webApp("Telegram", `https://fatso-fe-tau.vercel.app/?user=${encodeURIComponent(userId)}`);
        await ctx.reply("Here is your inline keyboard!", {
            reply_markup: menus,
        });
    }
    else {
        const menus = new grammy_1.InlineKeyboard().webApp("Telegram", `https://fatso-fe-tau.vercel.app/?user=${encodeURIComponent(userId)}`);
        await ctx.reply("Here is your inline keyboard!", {
            reply_markup: menus,
        });
    }
};
exports.start = start;
