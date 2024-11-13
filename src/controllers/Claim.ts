import { Request, Response } from "express";
import { User } from "../models/User";

export const claim = async (req: Request, res: Response) => {
  const { user, address } = req.body;
  console.log("claim", user, address);

  try {
    const userData = await User.findOne({ tg_id: user });
    if (!userData) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    //TODO: check user's Ocicat balance

    // TODO: Send token to user's address

    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
