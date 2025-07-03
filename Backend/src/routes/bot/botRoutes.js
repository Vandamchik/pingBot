const express = require('express');
const { handlePing } = require('../../controllers/pingController');

// app.post(`/bot${BOT_TOKEN}`, (req, res) => {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });

module.exports = (bot) => {
    const router = express.Router();

    router.post('/', (req, res, next) => handlePing(req, res, next, bot));

    return router;
};
  