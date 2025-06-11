const { fetchJson } = require('../lib/function');

let handler = async (m, { naze, command, prefix, args }) => {

  if (!args[0]) return m.reply('Masukkan URL Facebook');

  let datafb = await fetchJson(`https://ky-zybotz.vercel.app/api/fbdl?url=${args[0]}`);
  if (!datafb.status) return m.reply('Gagal mengambil data.');

  const hasil = datafb.result;

  // Mengecek apakah download ada lebih dari 1
  if (hasil.download && hasil.download.length > 1) {
    // Kirim download kedua dulu
    await naze.sendFileUrl(m.chat, hasil.download[1].url, `${hasil.download[1].quality}`, m);
    
    // Kirim download pertama setelahnya
    await naze.sendFileUrl(m.chat, hasil.download[0].url, `${hasil.download[0].quality}`, m);
  } else if (hasil.download && hasil.download.length === 1) {
    // Jika hanya ada satu download
    await naze.sendFileUrl(m.chat, hasil.download[0].url, `Download: ${hasil.download[0].quality}`, m);
  } else {
    m.reply('Media tidak dikenali atau tidak ditemukan.');
  }
}

handler.command = ['fb2']
module.exports = handler;