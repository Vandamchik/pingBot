const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')

const { BOT_TOKEN, PORT, FRONTEND_URL } = require('./src/config/env');
const { handleMessage } = require('./src/handlers/messageHandler');
const routes = require('./src/routes');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');


const app = express();
const bot = new TelegramBot(BOT_TOKEN);

const WEBHOOK_URL = `${FRONTEND_URL}/bot${BOT_TOKEN}`;

app.use(express.json());
app.use(cors())

handleMessage(bot);

app.use('/api', routes(bot));

app.use(errorHandler);

(async () => {
    try {
      await connectDB();
      await bot.setWebHook(WEBHOOK_URL);
      app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`✅ Webhook set: ${WEBHOOK_URL}`);
      });
    } catch (err) {
      console.error('❌ Error starting server:', err.message);
      process.exit(1);
    }
  })();
  
  
