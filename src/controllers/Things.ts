import { Request, Response } from 'express'
import { Things } from '../models/Things'

export const getThings = async (req: Request, res: Response) => {
  try {
    const things = await Things.find()
    res.status(200).json(things)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
