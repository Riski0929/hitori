let handler = m => m;

handler.before = async function (m, { naze }) {

if (db.xsesi[m.chat] && db.xsesi[m.chat].roomsesittsearch && m.quoted && db.xsesi[m.chat].roomsesittsearch.messageId === m.quoted.id) {
    if (m.key.remoteJid === 'status@broadcast') return;

    let roomSession = db.xsesi[m.chat].roomsesittsearch;

    let pilihan = parseInt(m.text);
    if (isNaN(pilihan)) return;

    // Mengecek apakah angka valid dalam daftar video
    
     if (pilihan < 1 || pilihan > roomSession.videoList.length) {
            return naze.sendMessage(m.chat, { text: "Nomor video tidak valid. Coba pilih antara 1 sampai " + roomSession.videoList.length }, { quoted: m });
        }

    let selectedVideo = roomSession.videoList[pilihan - 1];
    let videoUrl = selectedVideo.video_no_watermark;
    let caption = `📄 *Title:* ${selectedVideo.title}\n⏱️ *Duration:* ${selectedVideo.duration}s\n🌍 *Region:* ${selectedVideo.region}`;

    await naze.sendMessage(m.chat, {
    video: { url: videoUrl },
    caption: caption
  }, { quoted: m });
  
  
  // Hapus sesi setelah 10 menit
setTimeout(() => {
  if (db.xsesi[m.chat] && db.xsesi[m.chat].roomsesittsearch) {
    delete db.xsesi[m.chat].roomsesittsearch;
  }
}, 10 * 60 * 1000); // 10 menit
  
  }
};

module.exports = handler;