let axios = require('axios');
let cheerio = require('cheerio');

let handler = async (m, { naze, command, prefix }) => {
    naze.sessionsMail = naze.sessionsMail || {};

    for (let user in naze.sessionsMail) {
        let { lastCheckedAt } = naze.sessionsMail[user];
        if (Date.now() - lastCheckedAt > 30 * 60 * 1000) {
            delete naze.sessionsMail[user];
        }
    }

    if (command === "tempmail") {
        if (naze.sessionsMail[m.sender]) {
            return m.reply(`🚀 Anda sudah memiliki Temp Mail!\n📩 *Email:* ${naze.sessionsMail[m.sender].email}\n⏳ *Tunggu sekitar 5-10 menit sebelum cek.*`);
        }

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/create-temp-mail?apikey=${lann}`);
            if (!res.data.status) throw "❌ Gagal membuat email sementara!";

            let email = res.data.result;
            naze.sessionsMail[m.sender] = {
                email,
                createdAt: Date.now(),
                lastCheckedAt: Date.now()
            };

            m.reply(`✅ *Temp Mail Anda:*\n📩 *Email:* ${email}\n⏳ *Tunggu sekitar 5-10 menit sebelum cek.*`);
        } catch (e) {
            console.error(e);
            m.reply("❌ Terjadi kesalahan saat membuat email sementara!");
        }
    } else if (command === "cekmail" || command === "checkmail") {
        if (!naze.sessionsMail[m.sender]) {
          const vx = "`"
            return m.reply(`⚠️ Anda belum memiliki Temp Mail!\nGunakan ${vx}${prefix + command}${vx} untuk membuatnya.`);
        }

        let { email } = naze.sessionsMail[m.sender];

        naze.sessionsMail[m.sender].lastCheckedAt = Date.now();

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/cek-msg-tmp-mail?email=${email}&apikey=${lann}`);
            if (!res.data.status) throw "❌ Gagal mengambil pesan email!";
            
            let messages = res.data.result;
            if (messages.length === 0) {
                return m.reply(`📭 *Belum ada pesan masuk di ${email}.*\n⏳ *Coba cek lagi nanti.*`);
            }

            let pesan = messages.map((msg) => {
                let cleanText = extractText(msg.html || msg.text);
                return `📬 *Pesan Baru!*\n💌 *Dari:* ${msg.sf}\n📢 *Subjek:* ${msg.s}\n🕒 *Waktu:* ${msg.rr}\n\n📝 *Isi Pesan:*\n${cleanText}`;
            }).join("\n\n");

            m.reply(pesan);
        } catch (e) {
            console.error(e);
            m.reply("❌ Terjadi kesalahan saat mengecek email!");
        }
    }
};

handler.command = ['tempmail', 'cekmail', 'checkmail'];
handler.tags = ['tools'];
handler.help = ['tempmail', 'cekmail', 'checkmail'];
handler.limit = true;

module.exports = handler;

function extractText(html) {
    let $ = cheerio.load(html);
    return $.text().trim();
}