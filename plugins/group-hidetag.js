let handler = async (m, { naze, text, command }) => {

const participants = m.metadata?.participants || [];
await naze.sendMessage(m.chat, {
  text: text ? text : '' ,
  mentions: participants.map(p => p.id),
  contextInfo: {
    forwardingScore: 9999,
    isForwarded: true,
    mentionedJid: participants.map(p => p.id), 
    quotedMessage: {
      conversation: `${m.metadata.subject}`
    },
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  }
});

}

handler.command = ['hidetag', 'h'];
handler.group = true;
handler.admin = true;

module.exports = handler