import { Response, Request } from 'express'
import { User } from '../models/User'

export const upPoint = async (req: Request, res: Response) => {
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
      { $set: { point_level: userData.point_level + 1 } }
    )
    return res.json({ status: 'success', message: 'Point updated' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
