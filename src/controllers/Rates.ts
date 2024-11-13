import { Request, Response } from 'express'
import { Rates } from '../models/Rates'
import { User } from '../models/User'

export const getRates = async (req: Request, res: Response) => {
  try {
    const rates = await Rates.find()
    res.status(200).json(rates)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

export const updateRates = async (req: Request, res: Response) => {
  try {
    const { title, ocicat, odp, otp } = req.body
    const currentDateTime = new Date()
    const rates = await Rates.findOneAndUpdate(
      { title },
      { ocicat, odp, otp, title, updatedAt: currentDateTime },
      { new: true }
    )
    res.status(200).json(rates)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

export const updateRateDate = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const currentDateTime = new Date()
    const currentUser = await User.findOne({ tg_id: user })
    if (currentUser) {
      currentUser.rate_date = currentDateTime
      currentUser.tg_id = user
      await currentUser.save()
    }

    res.status(200).json(currentUser)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}
