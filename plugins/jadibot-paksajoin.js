const { paksaJoin } = require('../src/jadibot')
let handler = async (m, { naze, prefix, args, command }) => {
paksaJoin(naze, m);
}
handler.command = ['paksajoin']
handler.owner = true 
handler.botutama = true
module.exports = handler