import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'

export const getUsers = async (
  _: Request,
  response: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users = await User.find().sort({ mount: -1 })
    return response.json(users)
  } catch (error) {
    console.error('Error getting users:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserById = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id)

  try {
    const user = await User.findOne({ _id: id })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    return response.json(user)
  } catch (error) {
    console.error('Error getting user by id:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserByTgId = async (request: Request, response: Response) => {
  const id = request.body.user

  try {
    const user = await User.findOne({ tg_id: id })

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    return response.json(user)
  } catch (error) {
    console.error('Error getting user by tg_id:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const updateDate = async (request: Request, response: Response) => {
  const { user } = request.body
  const currentDateTime = new Date()

  try {
    const currentUser = await User.findOneAndUpdate(
      { tg_id: user },
      { rate_date: currentDateTime },
      { new: true }
    )
    return response.json(currentUser)
  } catch (error) {
    console.error('Error updating user data:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
export const downFullEnergy = async (request: Request, response: Response) => {
  const { user } = request.body

  try {
    const currentUser = await User.findOne({ tg_id: user })

    if (currentUser) {
      currentUser.full_energy = currentUser.full_energy - 1
      await currentUser.save()
    }
    return response.json(currentUser)
  } catch (error) {
    console.error('Error updating user data:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const setPubkey = async (request: Request, response: Response) => {
  const { user, address } = request.body

  try {
    const currentUser = await User.findOne({ tg_id: user })
    if (currentUser) {
      currentUser.public_key = address
      await currentUser.save()
    }
    return response.json(currentUser)
  } catch (error) {
    console.error('Error updating user data:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const updateUser = async (request: Request, response: Response) => {
  const { user, mount, balance } = request.body
  const currentDateTime = new Date()

  try {
    const currentUser = await User.findOne({ tg_id: user })
    if (currentUser) {
      currentUser.mount = Number(mount) + Number(currentUser.mount)
      currentUser.balance = Number(balance) + Number(currentUser.balance)
      currentUser.date = currentDateTime
      await currentUser.save()
    }
    return response.json(currentUser)
  } catch (error) {
    console.error('Error updating user data:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const createUser = async (request: Request, response: Response) => {
  const { user } = request.body
  const currentDateTime = new Date()

  try {
    const existingUser = await User.findOne({ tg_id: user })
    if (existingUser) {
      return response.status(400).json({ error: 'User already exists' })
    }
    const createdUser = await User.create({
      tg_id: user,
      mount: 0,
      balance: 0,
      date: currentDateTime,
    })
    return response.json(createdUser)
  } catch (error) {
    console.error('Error creating user:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
