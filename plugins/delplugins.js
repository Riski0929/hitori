const fs = require('fs');
const path = require('path');

let handler = async (m, { args, reply, isCreator }) => {
   

    const fileName = args[0];
    if (!fileName) return reply('Masukkan nama file plugin yang mau dihapus!\nContoh: .delplugin listplugins.js');

    const pluginPath = path.resolve(__dirname, fileName);

    // Cek apakah file ada
    if (!fs.existsSync(pluginPath)) {
        const available = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        return reply(`Plugin "${fileName}" tidak ditemukan!\nPlugin yang tersedia:\n- ${available.join('\n- ')}`);
    }

    try {
        // Hapus dari require cache
        const resolved = require.resolve(pluginPath);
        if (require.cache[resolved]) delete require.cache[resolved];

        // Hapus file
        fs.unlinkSync(pluginPath);

        // Hapus dari global.plugins juga
        if (global.plugins) {
            global.plugins = global.plugins.filter(p => p?.__filename !== pluginPath);
        }

        reply(`Plugin "${fileName}" berhasil dihapus!`);
    } catch (err) {
        console.error(err);
        reply('Gagal menghapus plugin.');
    }
};

handler.help = ['delplugin']
handler.tags = ['owner']
handler.command = ['delplugin'];
handler.owner = true;
handler.botutama = true

module.exports = handler;