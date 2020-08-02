const { Telegraf } = require('telegraf')

const sleep = ms => new Promise(r => setTimeout(r, ms));

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const checkInterval = 1000 * 60 * 5;

let started = true;
let lastChecked;

const start = async (check) => {
  const bot = new Telegraf(botToken);
  bot.command('check', async (ctx) => {
    let message = await check();
    if (message === null)
      message = `There are no bookable dates. Last time was automatically checked at ${lastChecked.toISOString()}`;
    ctx.reply(message);
  });
  bot.launch();

  while (true) {
    if (started) {
      try {
        lastChecked = new Date();
        const message = await check();
        if (message !== null) bot.telegram.sendMessage(chatId, message);
      } catch (e) {
        console.log(e);
        bot.telegram.sendMessage(chatId, e.message);
      }
    }
    await sleep(checkInterval);
  }
};

module.exports = { start };
