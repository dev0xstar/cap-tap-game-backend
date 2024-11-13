import { Request, Response } from "express";
import { Socials } from "../models/Socials";
import { addHours } from "date-fns";
import { User } from "../models/User";

export const bonus = async (req: Request, res: Response) => {
  const { user, title, price } = req.body;
  const currentDateTime = new Date();
  try {
    // const recentSocials = await Socials.find({
    //   tg_id: user,
    //   title: title,
    //   date: { $gte: addHours(currentDateTime, -24) },
    // })
    // if (recentSocials.length > 0) {
    //   return res.json({ status: 'error', message: 'You need more time' })
    // }

    const userData = await User.findOne({ tg_id: user });
    if (!userData) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const updatedMount = userData.mount + price;
    const updatedBalance = userData.balance + price;

    await User.updateOne(
      { tg_id: user },
      { $set: { mount: updatedMount, balance: updatedBalance } }
    );

    const newSocial = new Socials({
      tg_id: user,
      title: title,
      date: currentDateTime,
    });
    await newSocial.save();

    res.json({
      status: "success",
      mount: updatedMount,
      balance: updatedBalance,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
