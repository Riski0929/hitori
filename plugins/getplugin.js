let handler = async (m, { text, reply }) => {
    const fs = require('fs');
    const path = require('path');

    // Ambil nama plugin dari input, default: tampilkan semua plugin
    let pluginName = text.trim().toLowerCase();

    // Folder tempat file plugin
    const pluginDirectory = path.resolve(__dirname, '../plugins');
    
    // List semua file plugin di folder plugins
    const files = fs.readdirSync(pluginDirectory).filter(file => file.endsWith('.js'));
    
    if (pluginName) {
        // Kalau ada input pluginName, cek apakah file ada
        const pluginPath = path.join(pluginDirectory, `${pluginName}.js`);
        
        if (!fs.existsSync(pluginPath)) {
            return reply(`Plugin *${pluginName}* tidak ditemukan. Berikut daftar plugin yang tersedia:\n\n${files.join('\n')}`);
        }

        try {
            // Mengambil isi file plugin
            const plugin = require(pluginPath);
            reply(`\n${fs.readFileSync(pluginPath, 'utf8')}\n`);
        } catch (err) {
            console.error('Error membaca plugin:', err);
            reply(`Gagal membaca plugin *${pluginName}*. Cek log.`);
        }
    } else {
        // Kalau tidak ada input, tampilkan semua file plugin
        reply(`Berikut daftar plugin yang tersedia:\n\n${files.join('\n')}`);
    }
};

handler.help = ['getplugin']
handler.tags = ['owner']
handler.command = ['getplugin'];
handler.owner = true;
handler.botutama = true

module.exports = handler;