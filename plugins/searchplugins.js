let handler = async (m, { text, reply }) => {
    const fs = require('fs')
    const path = require('path')

    if (!text) return reply(`Contoh: .searchplug ai`)

    const pluginsPath = path.resolve(__dirname)
    const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'))

    let hasil = []

    for (const file of files) {
        const filePath = path.join(pluginsPath, file)
        try {
            const plugin = require(filePath)
            if (plugin.command) {
                const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
                const cocok = cmds.filter(cmd => cmd.toLowerCase().includes(text.toLowerCase()))
                if (cocok.length > 0) {
                    hasil.push({
                        file: file,
                        commands: cocok
                    })
                }
            }
        } catch (e) {
            console.log(`Error load ${file}:`, e)
        }
    }

    if (hasil.length === 0) return reply(`Tidak ditemukan plugin dengan kata kunci *${text}*`)

    let teks = `Hasil pencarian: *${text}*\n\n` + hasil.map((p, i) => {
        return `*${p.file}*\n` + p.commands.map(c => `▢ ${c}`).join('\n')
    }).join('\n\n')

    reply(teks)
}

handler.help = ['searchplug']
handler.tags = ['owner']
handler.command = ['searchplug']
handler.owner = true

module.exports = handler