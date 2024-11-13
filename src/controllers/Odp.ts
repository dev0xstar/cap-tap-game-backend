import { Request, Response } from 'express'
import { User } from '../models/User'

export const updateOdp = async (req: Request, res: Response) => {
  try {
    const { user, odp } = req.body
    const currentUser = await User.findOne({ tg_id: user })
    if (currentUser) {
      currentUser.odp = currentUser?.odp + Number(odp)
      await currentUser.save()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
