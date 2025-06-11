const axios = require('axios');

let handler = async (m, { text }) => {
  // Format: .cekmail email|password
  if (!text.includes('|')) return m.reply('Format salah!\nContoh: .cekmail email@gmail.com|password16digit');

  let [email, password] = text.split('|');

  try {
    let res = await axios.post('https://vynn.netlify.app/.netlify/functions/checkmail', {
      email,
      password
    });

    let data = res.data;

    if (!Array.isArray(data) || data.length === 0) {
      return m.reply(`📭 Tidak ada pesan terbaru di inbox.`);
    }

    let pesan = data.map((msg, i) => {
      return `📩 *${i + 1}. Pesan*\n🕒 ${msg.date}\n👤 Dari: ${msg.from}\n📌 Subjek: ${msg.subject}\n\n${msg.text.slice(0, 300)}...`;
    }).join('\n\n');

    m.reply(pesan);
  } catch (err) {
    console.error(err.response?.data || err.message);
    m.reply('❌ Gagal mengambil pesan email. Periksa email/password kamu atau coba lagi nanti.');
  }
};

handler.command = ['cekmaill', 'checkmaill'];
module.exports = handler;