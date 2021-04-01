const dotenv = require('dotenv').config(); 

const CakeWeb = require('./CakeBrain/Web');
const web = new CakeWeb(process.env.WEB_SSL_CERTIFICATE, process.env.WEB_SSL_CHAIN, process.env.WEB_SSL_PRIVATE_KEY, process.env.WEB_SESSION_SECRET);
if(process.env.USE_WEB) web.start();

const CakeDiscord = require('./CakeBrain/Discord');
const discord = new CakeDiscord(process.env.DISCORD_TOKEN);
if(process.env.USE_DISCORD) discord.start();

const CakeBancho = require('./CakeBrain/Bancho');
const bancho = new CakeBancho(process.env.OSU_API_KEY, process.env.OSU_USERNAME, process.env.OSU_IRC_KEY, process.env.OSU_TOOLS_LOCATION);
if(process.env.USE_BANCHO) bancho.start();