let handler = async (m, { prefix }) => {
    let groups = {} // untuk grup tag

    for (let plugin of global.plugins) {
        if (!plugin || !plugin.tags || !plugin.help) continue

        // Cek apakah help-nya array
        if (!Array.isArray(plugin.help)) {
            console.warn(`Plugin help bukan array:\n  Help: ${plugin.help}\n  Plugin:`, plugin)
            continue // lewati plugin ini
        }

        for (let tag of plugin.tags) {
            if (!groups[tag]) groups[tag] = []
            groups[tag].push(...plugin.help.map(cmd => `${prefix}${cmd}`))
        }
    }

    // format tampilan menu
    let menuText = `╭───❍ *LIST MENU* ❍───\n`
    for (let [tag, cmds] of Object.entries(groups)) {
        menuText += `│\n├── 「 *${tag.toUpperCase()}* 」\n`
        for (let cmd of cmds) {
            menuText += `│• ${cmd}\n`
        }
    }
    menuText += `╰──────────────❍`

    m.reply(menuText)
}

handler.command = ['menuall']
module.exports = handler