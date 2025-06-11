require('../settings');
let handler = async (m, { text, reply, isLimit, prefix, naze, setLimit, command }) => {

    // Ambil teks, bisa dari pesan yang diterima atau yang dibalas
    text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : '';

    // Cek apakah user melebihi limit
    if (!isLimit) return m.reply(mess.limit);

    // Cek apakah ada teks yang dikirimkan atau dibalas
    if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Kirim/reply pesan *${prefix + command}* Teksnya`);

    try {
        if (command === 'bratfury') {
            // Untuk bratfury (sticker image)
            await naze.sendAsSticker(
                m.chat,
                `https://fastrestapis.fasturl.cloud/maker/furbrat?text=${encodeURIComponent(text)}&style=1&position=center&mode=image`,
                m
            );
        } else if (command === 'bratfuryvid') {
            // Untuk bratfuryvid (animated sticker)
            await naze.sendAsSticker(
                m.chat,
                `https://fastrestapis.fasturl.cloud/maker/furbrat?text=${encodeURIComponent(text)}&style=1&position=center&mode=animated`,
                m
            );
        }

        // Set limit setelah berhasil
        setLimit(m, db);
    } catch (e) {
        try {
            // Coba gunakan API cadangan kalau yang utama gagal
            if (command === 'bratfury') {
                await naze.sendAsSticker(m.chat, 'https://aqul-brat.hf.space/?text=' + encodeURIComponent(text || m.quoted.text), m);
            } else if (command === 'bratfuryvid') {
                await naze.sendAsSticker(m.chat, 'https://aqul-brat.hf.space/?text=' + encodeURIComponent(text || m.quoted.text), m);
            }
            setLimit(m, db);
        } catch (e) {
            m.reply('Server Brat Sedang Offline!');
        }
    }
}

handler.help = ['bratfury', 'bratfuryvid'];  // Tambahkan keduanya di sini
handler.tags = ['sticker'];  // Tag tetap sama karena keduanya masuk dalam kategori sticker
handler.command = ['bratfury', 'bratfuryvid'];  // Tambahkan kedua command di sini

module.exports = handler;