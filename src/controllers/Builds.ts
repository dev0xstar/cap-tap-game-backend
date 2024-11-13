import { Request, Response } from 'express'
import { Builds } from '../models/Builds'

export const getBuilds = async (req: Request, res: Response) => {
  try {
    const builds = await Builds.find()
    res.status(200).json(builds)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
