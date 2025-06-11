const fs = require('fs')
let handler = async (m, {
    naze,
    prefix,
    command,
    text
}) => {
 let baseFolder = './database/jadibot/';
    let sessionFiles = ['session-', 'pre-key', 'sender-key', 'app-state'];

    fs.readdir(baseFolder, async (err, folders) => {
        if (err) {
            console.error('Unable to scan directory: ' + err);
            return m.reply('Unable to scan directory: ' + err);
        }

        // Filter folder yang namanya diawali '628'
        let targetFolders = folders.filter(folder => folder.startsWith('628'));
        if (targetFolders.length == 0) return m.reply('Tidak ada folder 628 yang ditemukan.');

        let totalDeleted = 0;
        let deletedFolders = [];
        let teks = `📂 *Folder yang terdeteksi:*\n\n`;

        for (let folder of targetFolders) {
            let folderPath = baseFolder + folder;
            let files = fs.readdirSync(folderPath);
            
            let filteredFiles = files.filter(file => sessionFiles.some(ext => file.startsWith(ext)));
            if (filteredFiles.length == 0) continue;

            teks += `📂 *${folder}* (${filteredFiles.length} file)\n`;
            totalDeleted += filteredFiles.length;
            deletedFolders.push(folder);

            if (text && text == 'true') {
                filteredFiles.forEach(file => fs.unlinkSync(`${folderPath}/${file}`));
            }
        }

        if (totalDeleted == 0) return m.reply('Tidak ada sampah session yang ditemukan.');

        if (text && text == 'true') {
            let deletedText = `✅ *Berhasil menghapus ${totalDeleted} file sampah session di folder:*\n\n` + 
                              deletedFolders.map(f => `📂 ${f}`).join('\n');
            return m.reply(deletedText);
        }

        m.reply(teks + `\nKetik _${prefix + command} true_ untuk menghapus.`);
    });
   
  }
  
handler.command = ['delsesi']
handler.tags = ['owner']
handler.help = ['delsesi']
handler.owner = true

module.exports = handler