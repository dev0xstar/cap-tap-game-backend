import { User } from "../models/User";
import { getLevelInfo } from "./level-info";

export const schedulers = {
  first: async function () {
    try {
      const users = await User.find().sort({ id: 1 });

      const bulkOps = users.map((user) => {
        const rewardPerHour =
          20 * getLevelInfo(user.mount).number + user.total_reward;

        return {
          updateOne: {
            filter: { tg_id: user.tg_id },
            update: { $inc: { mount: rewardPerHour } },
          },
        };
      });

      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
        console.log("Reward updated for all users");
      } else {
        console.log("No users to update");
      }
    } catch (error) {
      console.error("Error updating rewards:", error);
    }
  },
  second: async function () {
    try {
      const users = await User.find().sort({ id: 1 });

      const bulkOps = users.map((user) => {
        const rewardPerHour =
          20 * getLevelInfo(user.mount).number + user.total_reward;

        return {
          updateOne: {
            filter: { tg_id: user.tg_id },
            update: { $inc: { balance: rewardPerHour } },
          },
        };
      });

      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
        console.log("Reward updated for all users");
      } else {
        console.log("No users to update");
      }
    } catch (error) {
      console.error("Error updating rewards:", error);
    }
  },
  third: async function () {
    try {
      const users = await User.find().sort({ id: 1 });

      const maxEnergy = 6;

      const bulkOps = users.map((user) => ({
        updateOne: {
          filter: { tg_id: user.tg_id },
          update: { $set: { full_energy: maxEnergy } },
        },
      }));

      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
        console.log("Full energy updated for all users");
      } else {
        console.log("No users to update");
      }
    } catch (error) {
      console.error("Error updating full energy:", error);
    }
  },
};
