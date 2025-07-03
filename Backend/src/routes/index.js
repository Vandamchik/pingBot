const express = require('express');
const pingRoutes = require('./ping/pingRoutes');

module.exports = (bot) => {
  const router = express.Router();

  router.use('/ping', pingRoutes(bot));

  return router;
};