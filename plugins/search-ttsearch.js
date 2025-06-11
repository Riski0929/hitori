const { fetchJson } = require('../lib/function');
let handler = async (m, { naze, args }) => {

    global.db.xsesi[m.chat] || {};
global.db.xsesi[m.chat] =  global.db.xsesi[m.chat] || {}
global.db.xsesi || {}
 global.db.xsesi = global.db.xsesi || {};  

  if (!args[0]) return m.reply('Masukkan query');

  let data = await fetchJson(`https://ky-zybotz.vercel.app/api/ttsearch?query=${encodeURIComponent(args.join(' '))}`);
  if (!data.status) return m.reply('Gagal mengambil data.');

  const videos = data.result.videos;

  if (!videos || videos.length === 0) {
    return m.reply('Tidak ditemukan hasil untuk query tersebut.');
  }

  // Kirim video pertama
  const firstVideo = videos[0];
  const videoUrl = firstVideo.video_no_watermark;
  const caption = `📄 *Title:* ${firstVideo.title}\n⏱️ *Duration:* ${firstVideo.duration}s\n🌍 *Region:* ${firstVideo.region}`;

  await naze.sendMessage(m.chat, {
    video: { url: videoUrl },
    caption: caption
  }, { quoted: m });

  // Kirim sisanya via reply
  if (videos.length > 1) {
    let text = `*Hasil lainnya:*\n\n`;
    for (let i = 1; i < videos.length; i++) {
      text += `*${i}.*\n`;
      text += `📄 *Title:* ${videos[i].title}\n`;
      text += `⏱️ *Duration:* ${videos[i].duration}s\n`;
      text += `🌍 *Region:* ${videos[i].region}\n`;
      text += `▶️ *Video:* ${videos[i].video_no_watermark}\n\n`;
    }
    let anu = await m.reply(text.trim());
    

    
    global.db.xsesi[m.chat].roomsesittsearch = {
            videoList: videos.slice(1, 12),
            messageId: anu.key.id,
            selectedVideo: null
        };
  }

}

handler.command = ['ttsearch']
module.exports = handler