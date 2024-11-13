import { Schema, model } from 'mongoose'

const buildsSchema = new Schema({
  tg_id: { type: String },
  tg_name: { type: String },
  date: { type: Date },
  level: { type: Number, default: 1 },
})

export const Builds = model('Builds', buildsSchema)
