import { Schema, model } from 'mongoose'

const socialsSchema = new Schema({
  tg_id: { type: String, ref: 'User' },
  title: { type: String },
  date: { type: Date },
})

export const Socials = model('Socials', socialsSchema)
