const { cekJoin } = require('../src/jadibot')
let handler = async (m, { naze, prefix, args, command }) => {
cekJoin(naze, m, db);
}
handler.command = ['cekjoin']
handler.owner = true 
handler.botutama = true
module.exports = handler