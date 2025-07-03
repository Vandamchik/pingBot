const express = require('express');
const pingRoutes = require('./ping/pingRoutes');
const botRoutes = require('./bot/botRoutes');
const { BOT_TOKEN } = require('../config/env')

module.exports = (bot) => {
  const router = express.Router();

  router.post(`/bot/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
  router.use('/ping', pingRoutes(bot));

  return router;
};