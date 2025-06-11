const { fetchJson } = require('../lib/function');
let handler = async (m, { naze, text, args }) => {

  if (!args[0]) return m.reply('Masukkan query');

  let data = await fetchJson(`https://ky-zybotz.vercel.app/api/gemini?query=${encodeURIComponent(text)}`);
  if (!data.status) return m.reply('Gagal mengambil data.');

  const hasil = data.result;

  if (hasil.media) {
    // Kirim gambar via URL
    await naze.sendMessage(m.chat, {
      image: { url: hasil.media },
      caption: hasil.message
    }, { quoted: m });
  } else {
    // Kalau cuma text
    m.reply(hasil.message);
  }

}

handler.command = ['gemini2','geminii'];
module.exports = handler;