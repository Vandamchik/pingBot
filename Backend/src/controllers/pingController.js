const User = require('../models/User');
const { ADMIN_IDS } = require('../config/env');
const { CLIENT, ADMINISTRATOR } = require('../constants/userRoles');

exports.handlePing = async (req, res, next, bot) => {
  try {
    const user = req.body;

    if (!user || Object.keys(user).length === 0)
        return res.status(400).json({ ok: false, message: 'No user data provided' });

    console.log('📥 PING:', user);

    const { id, username, first_name, last_name, queryId } = user || {};

    const existingUser = await User.findOne({ telegramId: id });

    let userRole = ADMINISTRATOR;

    if (!existingUser) {
      const newUser = await User.create({
        queryId,
        telegramId: id,
        userFirstName: first_name,
        userLastName: last_name,
        role: CLIENT,
      });
    
      userRole = newUser.role;
    } else {
      userRole = existingUser.role;
    }
    

    const pingMessageText = `
        🔔 Ping from ${username ?? 'Unknown User'} (${id})
        Full Name: ${first_name} ${last_name}, Role: ${userRole ?? ADMINISTRATOR}  
    `;

    await Promise.allSettled(
      ADMIN_IDS.map((adminId) => bot.sendMessage(adminId, pingMessageText))
    );

    res.status(200).json({ ok: true, message: 'Ping received' });
  } catch (err) {
    console.error('❌ handlePing error:', err.message);
    next(err);
  }
};
