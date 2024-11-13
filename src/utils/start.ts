import { InlineKeyboard, Context } from "grammy";
import { User } from "../models/User";
import { Tasks } from "../models/Tasks";
import { UserTasks } from "../models/UserTasks";

export const start = async (ctx: any) => {
  const userId = ctx.from.id;
  const received = ctx.match;

  const user = await User.findOne({ tg_id: userId });

  if (!user) {
    let sender = null;
    if (received) {
      sender = await User.findOne({ tg_id: received });
    }
    const currentDateTime = new Date();
    const newUser = new User({
      tg_id: userId,
      mount: ctx.from.is_premium === true ? 70_000 : 10_000,
      balance: ctx.from.is_premium === true ? 70_000 : 10_000,
      point_level: 1,
      energy_level: 1,
      total_reward: 0,
      friend_ids: sender ? [sender.tg_id] : [],
      date: currentDateTime,
      username: ctx.from.username || ctx.from.first_name,
    });
    const tasks = await Tasks.find();
    for (const task of tasks) {
      await UserTasks.create({
        tg_id: userId,
        task_id: task._id,
        status: "",
      });
    }
    await newUser.save();
    if (sender) {
      await User.findOneAndUpdate(
        { tg_id: received },
        {
          $inc: {
            mount: ctx.from.is_premium === true ? 70_000 : 10_000,
            balance: ctx.from.is_premium === true ? 70_000 : 10_000,
          },
        }
      );
    }

    const menus = new InlineKeyboard().webApp(
      "Telegram",
      `https://fatso-fe-tau.vercel.app/?user=${encodeURIComponent(userId)}`
    );

    await ctx.reply("Here is your inline keyboard!", {
      reply_markup: menus,
    });
  } else {
    const menus = new InlineKeyboard().webApp(
      "Telegram",
      `https://fatso-fe-tau.vercel.app/?user=${encodeURIComponent(userId)}`
    );

    await ctx.reply("Here is your inline keyboard!", {
      reply_markup: menus,
    });
  }
};
