import { Schema, model } from 'mongoose'

const userTasksSchema = new Schema({
  tg_id: { type: String, required: true, ref: 'User' },
  task_id: { type: String, required: true, ref: 'Tasks' },
  status: { type: String, enum: ['completed', 'pending', ''], default: '' },
})

export const UserTasks = model('UserTasks', userTasksSchema)
