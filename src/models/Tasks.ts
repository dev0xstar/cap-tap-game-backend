import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
  task_name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['completed', 'pending', 'starting'],
    default: 'starting',
  },
  url: { type: String }, // https://whatsapp.com
  mobileUrl: { type: String }, // whatsapp://send?text=Hello%2C%20World!
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  extra: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  img: { type: String },
})

export const Tasks = model('Tasks', taskSchema)
