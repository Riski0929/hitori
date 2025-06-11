const fs = require('fs');
const { exec } = require('child_process');

let handler = async (m, { naze, text }) => {
  const sender = m.sender.split('@')[0];
  const isOwner = global.owner.includes(sender);

  if (!isOwner) {
    return m.reply(`https://github.com/nazedev/hitori\n⬆️ Itu Sc nya cuy`, {
      contextInfo: {
        forwardingScore: 10,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: my.ch,
          serverMessageId: null,
          newsletterName: 'Join For More Info'
        },
        externalAdReply: {
          title: author,
          body: 'Subscribe My YouTube',
          thumbnail: fake.thumbnail,
          mediaType: 2,
          mediaUrl: my.yt,
          sourceUrl: my.yt,
        }
      }
    });
  }

  const bekup = 'backup_project.zip';
  exec(`zip -r ${bekup} . -x "node_modules/*" "nazedev/*" "package-lock.json" ".npm/*"`, (err, stdout, stderr) => {
    if (err) return m.reply('Gagal membuat backup: ' + stderr);

    if (fs.existsSync(bekup)) {
      m.reply({
        document: fs.readFileSync(bekup),
        mimetype: 'application/zip',
        fileName: bekup
      }).then(() => {
        fs.unlinkSync(bekup); 
      }).catch((e) => {
        m.reply('Gagal mengirim file: ' + e.message);
      });
    } else {
      m.reply('Backup zip tidak ditemukan.');
    }
  });
};

handler.command = ['sc', 'script'];
module.exports = handler;