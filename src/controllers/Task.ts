import { Request, Response } from 'express'
import { UserTasks } from '../models/UserTasks'
import { Tasks } from '../models/Tasks'
import { User } from '../models/User'

export const getTasks = async (request: Request, response: Response) => {
  try {
    const user = parseInt(request.params.id)
    const tasks = await UserTasks.find({ tg_id: user }).populate('task_id')

    return response.json(
      tasks.map((task: any) => {
        return {
          title: task.task_id.task_name,
          description: task.task_id.description,
          status: task.status,
          link: task.task_id.url,
          img: task.task_id.img,
          price: task.task_id.price,
          extra: task.task_id.extra,
          task_id: task._id,
        }
      })
    )
  } catch (error) {
    console.error('Error getting tasks:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const createTask = async (request: Request, response: Response) => {
  try {
    const {
      task_name,
      description,
      status = 'starting',
      url,
      img,
      price,
    } = request.body
    const task = await Tasks.create({
      task_name,
      description,
      status,
      url,
      img,
      price,
    })
    const users = await User.find()
    for (const user of users) {
      await UserTasks.create({
        tg_id: user.tg_id,
        task_id: task._id,
        status: '',
      })
    }

    return response.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTask = async (request: Request, response: Response) => {
  const { task_id } = request.params
  const { status } = request.body
  try {
    await UserTasks.findOneAndUpdate({ _id: task_id }, { status })
    return response.json({ status: 'success' })
  } catch (error) {
    console.error('Error updating task:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
