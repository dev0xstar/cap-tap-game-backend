import { Request, Response } from "express";
import { Rates } from "../models/Rates";
import { User } from "../models/User";
export const exchange = async (req: Request, res: Response) => {
  const { user, from, to, amount } = req.body;
  const rate = await Rates.findOne({ title: "rates" });

  if (!rate) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  // get user
  const userObject = await User.findOne({ tg_id: user });
  if (!userObject) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // check balance
  if (from === "odp") {
    if (userObject.odp < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
  } else if (from === "itp") {
    if (userObject.mount < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
  } else {
    return res.status(400).json({
      message: "Invalid currency",
    });
  }

  // calculate amount
  let newAmount = 0;
  if (from === "odp") {
    newAmount = amount * rate.otp;
  } else if (from === "otp") {
    newAmount = amount * rate.odp;
  }

  // update user balance
  if (from === "odp") {
    userObject.odp -= amount;
    userObject.balance += newAmount;
  } else if (from === "otp") {
    userObject.balance -= amount;
    userObject.odp += newAmount;
  }

  await userObject.save();

  res.status(200).json({
    message: "success",
    data: user,
    exchangeData: {
      from,
      to,
      amount,
      newAmount,
    },
  });
};
