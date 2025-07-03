require('dotenv').config();

const requiredEnv = ['BOT_TOKEN', 'PORT', 'ADMIN_IDS', 'FRONTEND_URL', 'MONGODB_URI'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`~~ Missing required environment variable: ${key} ~~`);
    process.exit(1);
  }
}

const ADMIN_IDS = process.env.ADMIN_IDS
  .split(',')
  .map(id => id.trim())
  .filter(id => /^\d+$/.test(id))
  .map(id => parseInt(id, 10)) ?? [];

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: process.env.PORT || 3000,
  ADMIN_IDS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MONGODB_URI: process.env.MONGODB_URI
};