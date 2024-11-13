"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const grammy_1 = require("grammy");
const process_1 = __importDefault(require("process"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const connect_db_1 = require("./utils/connect-db");
const start_1 = require("./utils/start");
const scheduler_1 = require("./utils/scheduler");
const query_data_1 = require("./utils/query-data");
const User_1 = require("./controllers/User");
const Friends_1 = require("./controllers/Friends");
const Task_1 = require("./controllers/Task");
const Bonus_1 = require("./controllers/Bonus");
const Invite_1 = require("./controllers/Invite");
const Connect_1 = require("./controllers/Connect");
const Point_1 = require("./controllers/Point");
const Energy_1 = require("./controllers/Energy");
const Rates_1 = require("./controllers/Rates");
const Odp_1 = require("./controllers/Odp");
const Things_1 = require("./controllers/Things");
const Builds_1 = require("./controllers/Builds");
const Reward_1 = require("./controllers/Reward");
const Claim_1 = require("./controllers/Claim");
const Exchange_1 = require("./controllers/Exchange");
const Things_2 = require("./models/Things");
(0, connect_db_1.connectDb)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/users", User_1.getUsers);
app.put("/users", User_1.updateUser);
app.post("/users", User_1.createUser);
app.get("/users/:id", User_1.getUserById);
app.post("/friends", Friends_1.getFriends);
app.get("/tasks/:id", Task_1.getTasks);
app.post("/tasks", Task_1.createTask);
app.post("/tasks/:task_id", Task_1.updateTask);
app.post("/bonus", Bonus_1.bonus);
app.post("/sendInvite", Invite_1.sendInvite);
app.post("/connect", Connect_1.connect);
app.post("/point", Point_1.upPoint);
app.post("/energy", Energy_1.upEnergy);
app.post("/totalenergy", Energy_1.updateEnergy);
app.get("/rate", Rates_1.getRates);
app.post("/odp", Odp_1.updateOdp);
app.post("/ratedate", Rates_1.updateRateDate);
app.post("/tgid", User_1.getUserByTgId);
app.get("/things", Things_1.getThings);
app.get("/builds", Builds_1.getBuilds);
app.post("/upreward", Reward_1.updateReward);
app.post("/date", User_1.updateDate);
app.post("/fullenergy", User_1.downFullEnergy);
app.post("/publickey", User_1.setPubkey);
app.post("/claim", Claim_1.claim);
app.post("/exchange", Exchange_1.exchange);
app.post("/limit", async (req, res) => {
    const { limit } = req.body;
    const things = await Things_2.Things.findOne();
    if (things) {
        things.limit = limit;
        await things.save();
    }
    else {
        await Things_2.Things.create({ limit });
    }
    res.send({ message: "Limit updated" });
});
const bot = new grammy_1.Bot(process_1.default.env.BOT_TOKEN || "");
const rule = new node_schedule_1.default.RecurrenceRule();
rule.hour = 1;
rule.minute = 0;
rule.second = 0;
rule.tz = "America/Toronto";
bot.command("start", start_1.start);
bot.on("callback_query:data", query_data_1.queryData);
bot.start();
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof grammy_1.GrammyError) {
        console.error("Error in request:", e.description);
    }
    else if (e instanceof grammy_1.HttpError) {
        console.error("Could not contact Telegram:", e);
    }
    else {
        console.error("Unknown error:", e);
    }
});
app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
node_schedule_1.default.scheduleJob("*/59 * * * *", scheduler_1.schedulers.first);
node_schedule_1.default.scheduleJob("*/59 * * * *", scheduler_1.schedulers.second);
node_schedule_1.default.scheduleJob("0 0 * * *", scheduler_1.schedulers.third);
