const axios = require('axios');
const { TelegraPh, UguuSe } = require('../lib/uploader');
let handler = async (m, { naze, prefix, args, command }) => {
  const quoted = m.quoted ? m.quoted : m
  const mime = (quoted.msg || quoted).mimetype || ''

  if (/image/.test(mime)) {
    try {
      let media = await quoted.download()


      let anu = await UguuSe(media)

      // Ambil gambar dari API zynnaa
      let response = await axios.get(`https://zynnaa-api.hf.space/api/v1/jadibabi?url=${encodeURIComponent(anu.url)}`, {
        responseType: 'arraybuffer'
      })

      await m.reply({ image: Buffer.from(response.data), caption: 'Done' })
      

    } catch (e) {
      console.error(e)
      m.reply('Terjadi kesalahan atau server sedang offline!')
    }
  } else {
    m.reply(`Kirim/Reply Gambar dengan format\nExample: ${prefix + command}`)
  }
}

handler.command = ['jadibabi','tobabi']
module.exports = handler