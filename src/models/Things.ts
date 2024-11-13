import { Schema, model } from "mongoose";

const thingsSchema = new Schema({
  limit: {
    type: Number,
    required: true,
  },
});

export const Things = model("Things", thingsSchema);
