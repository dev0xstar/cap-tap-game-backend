import "dotenv/config";

import { Bot, GrammyError, HttpError } from "grammy";
import process from "process";
import express, { Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import schedule from "node-schedule";
import { connectDb } from "./utils/connect-db";
import { start } from "./utils/start";
import { schedulers } from "./utils/scheduler";
import { queryData } from "./utils/query-data";
import {
  createUser,
  downFullEnergy,
  getUserById,
  getUserByTgId,
  getUsers,
  setPubkey,
  updateDate,
  updateUser,
} from "./controllers/User";
import { getFriends } from "./controllers/Friends";
import { createTask, getTasks, updateTask } from "./controllers/Task";
import { bonus } from "./controllers/Bonus";
import { sendInvite } from "./controllers/Invite";
import { connect } from "./controllers/Connect";
import { upPoint } from "./controllers/Point";
import { updateEnergy, upEnergy } from "./controllers/Energy";
import { getRates, updateRateDate } from "./controllers/Rates";
import { updateOdp } from "./controllers/Odp";
import { getThings } from "./controllers/Things";
import { getBuilds } from "./controllers/Builds";
import { updateReward } from "./controllers/Reward";
import { claim } from "./controllers/Claim";
import { exchange } from "./controllers/Exchange";
import { Things } from "./models/Things";

connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.get("/users", getUsers as any);
app.put("/users", updateUser as any);
app.post("/users", createUser as any);
app.get("/users/:id", getUserById as any);
app.post("/friends", getFriends as any);
app.get("/tasks/:id", getTasks as any);
app.post("/tasks", createTask as any);
app.post("/tasks/:task_id", updateTask as any);
app.post("/bonus", bonus as any);
app.post("/sendInvite", sendInvite as any);
app.post("/connect", connect as any);
app.post("/point", upPoint as any);
app.post("/energy", upEnergy as any);
app.post("/totalenergy", updateEnergy as any);
app.get("/rate", getRates as any);
app.post("/odp", updateOdp as any);
app.post("/ratedate", updateRateDate as any);
app.post("/tgid", getUserByTgId as any);
app.get("/things", getThings as any);
app.get("/builds", getBuilds as any);
app.post("/upreward", updateReward);
app.post("/date", updateDate as any);
app.post("/fullenergy", downFullEnergy as any);
app.post("/publickey", setPubkey as any);
app.post("/claim", claim as any);
app.post("/exchange", exchange as any);
app.post("/limit", async (req: Request, res: Response) => {
  const { limit } = req.body;
  const things = await Things.findOne();
  if (things) {
    things.limit = limit;
    await things.save();
  } else {
    await Things.create({ limit });
  }
  res.send({ message: "Limit updated" });
});

const bot = new Bot(process.env.BOT_TOKEN || "");

const rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 0;
rule.second = 0;
rule.tz = "America/Toronto";

bot.command("start", start);

bot.on("callback_query:data", queryData);

bot.start();

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

schedule.scheduleJob("*/59 * * * *", schedulers.first);
schedule.scheduleJob("*/59 * * * *", schedulers.second);

schedule.scheduleJob("0 0 * * *", schedulers.third);
