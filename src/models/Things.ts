import { Schema, model } from 'mongoose'

const thingsSchema = new Schema({})

export const Things = model('Things', thingsSchema)
