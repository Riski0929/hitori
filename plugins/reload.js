let handler = async (m, { text, reply, isCreator }) => {
    

    const fs = require('fs');
    const path = require('path');

    // Nama file yang mau direload, default: sf.js
    let pluginName = text.trim().toLowerCase() || 'sf.js';
    if (!pluginName.endsWith('.js')) pluginName += '.js';

    const pluginPath = path.resolve(__dirname, '../plugins', pluginName);

    if (!fs.existsSync(pluginPath)) return reply(`Plugin *${pluginName}* tidak ditemukan.`);

    try {
        delete require.cache[require.resolve(pluginPath)];
        const updatedPlugin = require(pluginPath);

        // Ganti plugin lama di global.plugins
        global.plugins = global.plugins.filter(p => !p.command?.some(cmd => updatedPlugin.command?.includes(cmd)));
        global.plugins.push(updatedPlugin);

        reply(`Berhasil reload plugin *${pluginName}*!`);
    } catch (err) {
        console.error(`Gagal reload ${pluginName}:`, err);
        reply(`Gagal reload plugin *${pluginName}*. Cek console.`);
    }
};

handler.help = ['reload']
handler.tags = ['owner']
handler.command = ['reload','rd'];
handler.owner = true;

module.exports = handler;