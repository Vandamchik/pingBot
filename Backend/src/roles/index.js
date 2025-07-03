const { ADMIN_IDS } = require('../config/env');

function isAdmin(userId) {
    return ADMIN_IDS.includes(Number(userId));
}

module.exports = { isAdmin };
