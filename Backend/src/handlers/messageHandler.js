const { isAdmin } = require('../roles');

function handleMessage(bot) {
  bot.on('message', async (msg) => {
    const userId = msg?.from?.id;
    const messageText = msg?.text;
    const chatId = msg?.chat?.id;

    if (isAdmin(userId)) {
        await bot.sendMessage(chatId, `👑 Hi Admin, ${messageText}`);
      } else {
        await bot.sendMessage(chatId, `👤 Hi User, ${messageText}`);
      }
  });
}

module.exports = { handleMessage };
