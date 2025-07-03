const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')

const { BOT_TOKEN, PORT } = require('./src/config/env');
const { handleMessage } = require('./src/handlers/messageHandler');
const routes = require('./src/routes');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');


const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();

app.use(express.json());
app.use(cors())

handleMessage(bot);

app.use('/api', routes(bot));

app.use(errorHandler);

(async () => {
    try {
      await connectDB();
      app.listen(PORT, () => console.log(`~~ Server running on PORT: ${PORT} ~~`));
    } catch (err) {
      console.error('~~ Error on runnig Server ~~', err.message);
      process.exit(1);
    }
  })();
  
