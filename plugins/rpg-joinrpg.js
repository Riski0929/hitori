
let handler = async (m, { naze, text, prefix, command }) => {


let user = db.users[m.sender];
    if (user.joinrpg) return m.reply(`Kamu sudah bergabung dalam RPG!`)

    user.joinrpg = true;
    await naze.sendMessage(m.chat, { 
        image: { url: 'https://telegra.ph/file/a4ec01498e764ae42c8c4.jpg' }, 
        caption: `Selamat! Kamu telah bergabung dalam RPG. Bersiaplah untuk petualangan seru!`,
        contextInfo: {
            mentionedJid: [m.sender] // Supaya tag pengguna terlihat
        }
    }, { quoted: m });
} 

handler.command = ['joinrpg']

module.exports = handler