const express = require('express');
const { handlePing } = require('../../controllers/pingController');

module.exports = (bot) => {
  const router = express.Router();

  router.post('/', (req, res, next) => handlePing(req, res, next, bot));

  return router;
};
