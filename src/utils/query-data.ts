import { InlineKeyboard } from "grammy";

export const queryData = async (ctx: any) => {
  const userid = ctx.from.id;
  const data = ctx.callbackQuery.data;
  switch (data) {
    case "howToEarn":
      const menus = new InlineKeyboard().webApp(
        "Open",
        `https://fatso-fe-tau.vercel.app/?user=${encodeURIComponent(userid)}`
      );
      await ctx.reply(
        "How to play VWS Worlds ⚡️\n\nFull version of the guide.\n\n💰 Tap to earn\nTap the screen and collect coins.\n\n⛏ Mine\nUpgrade cards that will give you passive income.\n\n⏰ Profit per hour\nThe exchange will work for you on its own, even when you are not in the game for 3 hours.\nThen you need to log in to the game again.\n\n📈 LVL\nThe more coins you have on your balance, the higher the level of your exchange is and the faster you can earn more coins.\n\n👥 Friends\nInvite your friends and you’ll get bonuses. Help a friend move to the next leagues and you'll get even more bonuses.\n\n/help to get this guide",
        {
          reply_markup: menus,
          parse_mode: "HTML",
        }
      );
    default:
      break;
  }
};
