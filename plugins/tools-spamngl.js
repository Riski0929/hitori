const { fetchJson } = require('../lib/function');

let handler = async (m, { text, command }) => {
  if (!text) return m.reply(`Contoh: .${command} Keren abis|https://ngl.link/kyy75164|2`);
  
  let [pesan, link, jumlah] = text.split('|');
  if (!pesan || !link || !jumlah) return m.reply('Format salah. Gunakan: pesan|link|jumlah');
  
  jumlah = parseInt(jumlah);
  if (isNaN(jumlah) || jumlah < 1) return m.reply('Jumlah harus berupa angka positif.');

  let hasil = [];

  for (let i = 0; i < jumlah; i++) {
    try {
      let res = await fetchJson(`https://zynn.koyeb.app/api/v1/sendngl?text=${encodeURIComponent(pesan)}&link=${encodeURIComponent(link)}`);
      hasil.push(res);
    } catch (e) {
      hasil.push({ success: false, error: e.message });
    }
  }

  let output = hasil.map((res, i) => `#${i + 1}: ${res.success ? 'Berhasil' : 'Gagal'}${res.data ? ` (ID: ${res.data.questionId})` : ''}`).join('\n');
  m.reply(output);
};

handler.command = ['chatngl', 'chat-ngl'];
handler.help = ['chatngl pesan|linkngl|jumlah'];
handler.tags = ['tools'];
handler.owner = false;

module.exports = handler;