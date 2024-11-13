import { Response, Request } from 'express'
import { User } from '../models/User'

export const upEnergy = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const userData = await User.findOne({ tg_id: user })
    if (!userData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' })
    }
    await User.updateOne(
      { tg_id: user },
      { $set: { point_level: userData.energy_level + 1 } }
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateEnergy = async (req: Request, res: Response) => {
  const { user, energy } = req.body
  try {
    const userData = await User.findOne({ tg_id: user })
    if (!userData) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' })
    }
    await User.updateOne(
      { tg_id: user },
      { $set: { energy: userData.energy + Number(energy) } }
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
