import { Schema, model } from 'mongoose'

const ratesSchema = new Schema({
  title: { type: String, unique: true, required: true },
  ocicat: { type: Number, default: 0 },
  odp: { type: Number, default: 0 },
  otp: { type: Number, default: 0 },
  date: { type: Date },
})

export const Rates = model('Rates', ratesSchema)
