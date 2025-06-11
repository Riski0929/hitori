/**
 *@Scraper: spotify
 *@By: Dxyz
 *@Type: cjs
 *@Base_Url: https://spotifytrackdownloader.com/
 *@Ch: https://whatsapp.com/channel/0029Vb6Q4eA1Hsq5qeBu0G1z
 *@Note: No Apus Wm
**/

const axios = require('axios');

async function spotify(url) {
    //metadata
    let metadata = {
        status: 500,
        success: false,
        result: {}
    };

    try {
        const regex = /^https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(?:\?.*)?$/;
        if (!url.match(regex)) throw '⚠️ Maaf Link Spotify';

        //metadata result
        metadata.status = 200;
        metadata.success = true;
        metadata.result = (await axios.post('https://node-spotify-downloader-backend-production.up.railway.app/download', {
            spotify_url: url
        })).data.data;

        return metadata;
    } catch (e) {
        metadata.result.msg = e;
        throw metadata;
    }
};


let handler = async (m, { naze, text }) => {
    if (!text || !text.includes('https://open.spotify.com/track/')) {
        return m.reply('Contoh:\n.spdl https://open.spotify.com/track/1xQ6trAsedVPCdbtDAmk0c');
    }

    try {
        const result = await spotify(text.trim());
        if (!result.success || !result.result?.url) {
            return m.reply('Gagal mengambil data lagu!');
        }

        await naze.sendMessage(m.chat, {
            audio: { url: result.result.url },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply('❌ Terjadi kesalahan saat memproses link.');
    }
};

handler.command = ['spotifydl2', 'spdl'];
module.exports = handler;