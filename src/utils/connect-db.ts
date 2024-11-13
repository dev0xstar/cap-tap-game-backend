import "dotenv/config";
import { connect } from "mongoose";
const uri = process.env.MONGODB_URI || "";

export const connectDb = async () => {
  try {
    const { connections } = await connect(uri as string);
    console.warn(
      `⚡️[DB]: Name:${connections[0].name}; Port:${connections[0].port}; Host:${connections[0].host};`
    );
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error("Error occurred while connecting to MongoDB", e);
  }
};
