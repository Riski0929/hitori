const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, convertTimestampToDate, getAllHTML, tarBackup } = require('../lib/function');
let handler = async (m, { naze, command, prefix, args }) => {

  if (!args[0]) return m.reply('Masukkan URL Instagram');

  let dataig = await fetchJson(`https://ky-zybotz.vercel.app/api/igdl?url=${args[0]}`);
  if (!dataig.status) return m.reply('Gagal mengambil data.');

  const hasil = dataig.result;

  if (dataig.type === 'video' && hasil.video) {
    await naze.sendFileUrl(m.chat, hasil.video, 'Berikut videonya', m);
  } else if (dataig.type === 'image' && hasil.images && Array.isArray(hasil.images)) {
    for (let i = 0; i < hasil.images.length; i++) {
      await naze.sendFileUrl(m.chat, hasil.images[i], `Gambar ke-${i + 1}`, m);
    }
  } else {
    m.reply('Media tidak dikenali.');
  }
  
}

handler.command = ['ig2']
module.exports = handler