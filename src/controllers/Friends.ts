import { Request, Response } from 'express'
import { User } from '../models/User'

export const getFriends = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const friends = await User.find({
      friend_ids: { $all: [user] },
    })
    console.log(friends)

    res.status(200).json({ items: friends })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
