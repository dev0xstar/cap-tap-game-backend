import { Request, Response } from 'express'
import { User } from '../models/User'

export const updateReward = async (req: Request, res: Response) => {
  try {
    const { user, upreward } = req.body
    const currentUser = await User.findOne({ tg_id: user })
    if (currentUser) {
      currentUser.total_reward = currentUser?.total_reward + Number(upreward)
      await currentUser.save()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
