import { Request, Response } from "express";

export const এক্সচেঞ্জ = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "এক্সচেঞ্জ কন্ট্রোলারে আপনাকে স্বাগতম",
  });
};
