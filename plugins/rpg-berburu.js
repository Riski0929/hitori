
let handler = async (m, { naze, text, prefix, command }) => {

let user = db.users[m.sender]
    if (!user.joinrpg) return m.reply('Kamu belum join RPG! Silakan ketik *.joinrpg* untuk bergabung.');
    // Pastikan lastberburu ada, kalau tidak, set ke 0
    if (!('lastberburu' in user)) user.lastberburu = 0

    let __timers = (new Date - user.lastberburu)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)

    if (__timers > 3600000) {
        let randomNumbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))

        let hsl = `
• *Hasil Berburu*

 *🐂 = [ ${randomNumbers[0]} ]*         *🐃 = [ ${randomNumbers[6]} ]*
 *🐅 = [ ${randomNumbers[1]} ]*         *🐮 = [ ${randomNumbers[7]} ]*
 *🐘 = [ ${randomNumbers[2]} ]*         *🐒 = [ ${randomNumbers[8]} ]*
 *🐐 = [ ${randomNumbers[3]} ]*         *🐗 = [ ${randomNumbers[9]} ]*
 *🐼 = [ ${randomNumbers[4]} ]*         *🐖 = [ ${randomNumbers[10]} ]*
 *🐊 = [ ${randomNumbers[5]} ]*         *🐓 = [ ${randomNumbers[11]} ]*
`

        user.banteng = (user.banteng || 0) + randomNumbers[0]
        user.harimau = (user.harimau || 0) + randomNumbers[1]
        user.gajah = (user.gajah || 0) + randomNumbers[2]
        user.kambing = (user.kambing || 0) + randomNumbers[3]
        user.panda = (user.panda || 0) + randomNumbers[4]
        user.buaya = (user.buaya || 0) + randomNumbers[5]
        user.kerbau = (user.kerbau || 0) + randomNumbers[6]
        user.sapi = (user.sapi || 0) + randomNumbers[7]
        user.monyet = (user.monyet || 0) + randomNumbers[8]
        user.babihutan = (user.babihutan || 0) + randomNumbers[9]
        user.babi = (user.babi || 0) + randomNumbers[10]
        user.ayam = (user.ayam || 0) + randomNumbers[11]

        setTimeout(() => {
            m.reply(hsl)
        }, 11000)

        setTimeout(() => {
            m.reply('Mendapatkan sasaran!')
        }, 10000)

        setTimeout(() => {
            m.reply('Sedang mencari mangsa...')
        }, 0)

        user.lastberburu = new Date * 1
    } else {
        m.reply(`\nSepertinya Anda Sudah kecapean, Silahkan Istirahat dulu sekitar *${timers}* Untuk bisa melanjutkan berburu.`)
    }
}

handler.group = true 
handler.command = ['berburu']

module.exports = handler