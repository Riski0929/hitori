let handler = async (m, { naze }) => {
    const fs = require('fs')
    const path = require('path')

    const pluginsPath = path.resolve(__dirname) // folder plugins
    const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'))

    let fitur = []
    let totalCommands = 0

    for (const file of files) {
        const filePath = path.join(pluginsPath, file)
        try {
            const plugin = require(filePath)
            if (plugin.command) {
                const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
                totalCommands += cmds.length
                fitur.push({
                    file: file,
                    commands: cmds
                })
            }
        } catch (e) {
            console.log(`Error load ${file}:`, e)
        }
    }

    if (fitur.length === 0) return m.reply('Tidak ada plugin yang terdeteksi.')

    let teks = `Total Plugin: *${fitur.length}*\nTotal Command: *${totalCommands}*\n\n` +
        fitur.map((p, i) => {
            return `*${p.file}*\n` + p.commands.map(c => `▢ ${c}`).join('\n')
        }).join('\n\n')

    m.reply(teks)
}

handler.command = ['listplug', 'listplugins']

module.exports = handler