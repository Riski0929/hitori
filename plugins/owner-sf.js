let handler = async (m, { text, prefix, command }) => {
    if (!text)
        return m.reply(`uhm.. teksnya mana?\n\npenggunaan:\n${prefix + command} <teks>\n\ncontoh:\n${prefix + command} menu.js`);

    if (!m.quoted.text)
        return m.reply(`balas pesan yang berisi kode plugin!`);

    const fs = require('fs');
    const path = require('path');

    let pluginName = text.trim().toLowerCase();
    if (!pluginName.endsWith('.js')) pluginName += '.js';
    const pluginPath = path.resolve(__dirname, '../plugins', pluginName);

    try {
        // Simpan plugin
        fs.writeFileSync(pluginPath, m.quoted.text);

        // Bersihkan cache dan load ulang plugin
        delete require.cache[require.resolve(pluginPath)];
        const updatedPlugin = require(pluginPath);

        // Tambahkan properti __filename untuk tracking
        updatedPlugin.__filename = pluginPath;

        // Validasi command


        // Ganti plugin lama yang punya command sama
        global.plugins = global.plugins.filter(p => p?.__filename !== pluginPath);
        global.plugins.push(updatedPlugin);

        m.reply(`Plugin *${pluginName}* berhasil disimpan dan direload!`);
    } catch (err) {
        console.error(`Gagal reload ${pluginName}:`, err);
        m.reply(`Gagal reload plugin *${pluginName}*. Cek console.`);
    }
};

handler.help = ['sf'];
handler.tags = ['owner'];
handler.command = ['sf'];
handler.owner = true;
handler.botutama = true

module.exports = handler;