  const fakeQuoted = {
    key: {
        remoteJid: 'status@broadcast',
        fromMe: false,
        id: 'FAKE1234',
        participant: '0@s.whatsapp.net'
    },
    message: {
        contactMessage: {
            displayName: '',
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;\nFN:\nitem1.TEL;waid=6282195023174:6282195023174\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
    }
}
  
    const { broadcastToJadibots } = require('../src/jadibot')

  let handler = async (m, { args, naze }) => {
 const message = args.join(' ') || 'Ini adalah pesan broadcast!';
    if (!message) return m.reply('Harap masukkan pesan untuk broadcast.');

    m.reply(`Sedang memulai broadcast ke semua jadibot...`);

    // Panggil fungsi broadcast di jadibot.js
    const result = await broadcastToJadibots(message, naze, m, fakeQuoted);

    if (result.success.length > 0) {
        m.reply(`Broadcast berhasil dikirim ke ${result.success.length} jadibot:\n${result.success.join('\n')}`);
    }
    if (result.failed.length > 0) {
        m.reply(`Gagal mengirim broadcast ke ${result.failed.length} jadibot:\n${result.failed.join('\n')}`);
    }
   }
   
handler.help = ['bcbot']
handler.tags = ['bot']
handler.command = ['bcbot']
handler.owner = true

module.exports = handler