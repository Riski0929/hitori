const { fetchJson } = require('../lib/function');

let handler = async (m, { naze, text, prefix, command, args, isLimit }) => {

    if (!isLimit) return m.reply(mess.limit)
    if (!text) return m.reply(`Example: ${prefix + command} url_tiktok`)
    if (!text.includes('tiktok.com')) return m.reply('Url Tidak Mengandung Result Dari Tiktok!')

    try {
        
        const hasil = await fetchJson(`https://vynn.netlify.app/api/tiktok?url=${args[0]}`);
       
        const info = hasil.result;
        
        if (!info) {
            return m.reply('Tidak ada hasil yang ditemukan.');
        }

        await naze.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        

        if (hasil.type === 'video' && info.video) {
           
            const captionvid = `
✘ ᴛɪᴋᴛᴏᴋ ɪɴғᴏ ✘
• ɪᴅ: ${info.id}
• ᴛɪᴛʟᴇ: ${info.title} 
• ʀᴇɢɪᴏɴ: ${info.region}
• ᴛᴀᴋᴇɴ_ᴀᴛ: ${info.taken_at}
• ᴅᴜʀᴀᴛɪᴏɴ: ${info.duration}

✘ ᴍᴜsɪᴄ ɪɴғᴏ ✘
• ɪᴅ: ${info.music_info.id}
• ᴛɪᴛʟᴇ: ${info.music_info.title}
• ᴀᴜᴛʜᴏʀ: ${info.music_info.author}
• ᴜʀʟ: ${info.music_info.url}

✘ sᴛᴀᴛs ✘
• ᴠɪᴇᴡs: ${info.stats.views}
• ʟɪᴋᴇs: ${info.stats.likes}
• ᴄᴏᴍᴍᴇɴᴛ: ${info.stats.comment}
• sʜᴀʀᴇ: ${info.stats.share}
• ᴅᴏᴡɴʟᴏᴀᴅ: ${info.stats.download}

✘ ᴀᴜᴛʜᴏʀ ✘
• ɪᴅ: ${info.author.id}
• ғᴜʟʟɴᴀᴍᴇ: ${info.author.fullname}
• ɴɪᴄᴋɴᴀᴍᴇ: ${info.author.nickname}

✘ sᴏᴜʀᴄᴇ ✘
• ᴡᴍ: ${info.video.watermark}
• ɴᴏᴡᴍ: ${info.video.nowatermark}
• ɴᴏᴡᴍʜᴅ: ${info.video.nowatermark_hd}
        `;
            
            await naze.sendFileUrl(m.chat, info.video.nowatermark, captionvid, m);
            await m.reply({
                audio: { url: info.music_info.url },
                mimetype: 'audio/mpeg'
            });
            await naze.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        } else if (hasil.type === 'image' && info.images) {
            // Jika hasil berupa gambar, kirim semua gambar
            for (let i = 0; i < info.images.length; i++) {
                await naze.sendFileUrl(m.chat, info.images[i], `*🚀Image:* ${i + 1}`, m);
            }
        } else {
            console.log("Error: Video type is not valid or missing video data.");
            m.reply('Video tidak ditemukan atau jenis video tidak valid.');
        }

    } catch (e) {
        console.log("Error:", e); // Log error untuk debugging
        m.reply('Terjadi kesalahan, coba lagi nanti.' + e.message);
    }
}

handler.command = ['tiktok', 'tiktokdown', 'ttdown', 'ttdl', 'tt', 'ttmp4', 'ttvideo', 'tiktokmp4', 'tiktokvideo']
module.exports = handler;