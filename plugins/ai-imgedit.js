const axios = require('axios')
const { rdGame, iGame, tGame, gameSlot, gameCasinoSolo, gameSamgongSolo, gameMerampok, gameBegal, daily, buy, setLimit, addLimit, addUang, setUang, transfer } = require('../lib/game');
const { UguuSe } = require('../lib/uploader');    
let handler = async (m, { naze, text, prefix, command }) => {
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
if (/image/.test(mime)) {
		m.reply(mess.wait)
		if (!text) return m.reply('Apa yang mau di edit lah?')
		let media = await quoted.download()
		let urlmedia = await UguuSe(media)
		try {
			const response = await axios.get('https://nirkyy.koyeb.app/api/v1/editimage', {
				params: {
					"prompt": text,
					"url": urlmedia.url
				},
				responseType: 'arraybuffer'
			});
			await m.reply({ image: Buffer.from(response.data, 'binary'), caption: 'Done' });
			setLimit(m, db);
		} catch (error) {
			console.error('Error fetching data:', error);
			m.reply('Gagal memproses gambar.');
		}
	} else m.reply(`Kirim/Reply Gambar dengan format\nExample: ${prefix + command} remove all objects in the image`)
}
handler.tags = ['ai']
handler.help = ['imgedit prompt']
handler.command = ['imgedit']
handler.premium = true;

module.exports = handler