const fetch = require('node-fetch');

let handler = async (m, { naze }) => {
  let ip = await fetch(`https://vynn.netlify.app/getip`).then(response => response.text());
  let message = `your ip: ${ip}`
m.reply(message)
};

handler.help = ['getip']
handler.tags = ['owner']
handler.command = ['getip','ip']
handler.owner = true

module.exports = handler;