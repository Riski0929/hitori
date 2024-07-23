process.on('uncaughtException', console.error)

/*
	* Create By Naze
	* Follow https://github.com/nazedev
	* Whatsapp : wa.me/6282113821188
*/

require('./settings');
const fs = require('fs');
const os = require('os');
const util = require('util');
const jimp = require('jimp');
const path = require('path');
const https = require('https');
const fse = require('fs-extra');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const cron = require('node-cron');
const cheerio = require('cheerio');
const request = require('request');
const maker = require('mumaker');
const fetch = require('node-fetch');
const FileType = require('file-type');
const { JSDOM } = require('jsdom');
const agent = require('superagent');
const similarity = require('similarity');
const webp = require('node-webpmux');
const ffmpeg = require('fluent-ffmpeg');
const nodemailer = require('nodemailer');
const speed = require('performance-now');
const didYouMean = require('didyoumean');
const { performance } = require('perf_hooks');
const moment = require('moment-timezone');
const Carbon = require('unofficial-carbon-now');
const imageToBase64 = require('image-to-base64');
const { exec, spawn, execSync } = require('child_process');
const smtpTransport = require('nodemailer-smtp-transport');
const { Primbon } = require('scrape-primbon');
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const primbon = new Primbon();
const { EmojiAPI } = require('emoji-api');
const emoji = new EmojiAPI();
const PDFDocument = require('pdfkit');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, isJidBroadcast, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys');

const prem = require('./src/premium');
const { LoadDataBase } = require('./src/message');
const { G4F } = require("g4f");
const g4f = new G4F();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const { TelegraPh, UguuSe } = require('./lib/uploader');
const { downloadTrack, searchSpoti } = require("./src/script/spotify.js")
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { imageToWebp, videoToWebp, writeExif } = require('./lib/exif');
const { chatGpt, tiktokDl, facebookDl, instaDl, instaStory, ytMp4, ytMp3, Ytdl } = require('./lib/screaper');
const { gameSlot, gameCasinoSolo, gameMerampok, gameTangkapOr, daily, transferLimit, transferUang } = require('./lib/game');
const { pinterest, pinterest2, wallpaper, wikimedia, quotesAnime, happymod, umma, ringtone, jadwalsholat, styletext } = require('./lib/scraper');
const { color, bgcolor } = require('./lib/color')
const fakejpg = fs.readFileSync(`./src/bruhhh.jpg`)
const fakedoc = fs.readFileSync(`./src/bruhhh.apk`)
const { formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, webApi, parseMention, generateProfilePicture, getRandom, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, generateToken, batasiTeks, randomText, isEmoji, getAllHTML } = require('./lib/function');

// Read Database
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const genAI = new GoogleGenerativeAI(gemini_key);

module.exports = naze = async (naze, m, chatUpdate, store) => {
	try {
		const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
		
		function decodeJid(jid) {
            if (/:\d+@/gi.test(jid)) {
                const decode = jidNormalizedUser(jid);
                return decode
            } else return jid;
        }
   
      
         
const key = m.key  
const id = key.id      
const isBaileys = isJidBroadcast(key.remoteJid) || id.startsWith('BAE5') && id.length === 16 || id.startsWith('3EB0') && id.length === 12
		
		const budy = (typeof m.text == 'string' ? m.text : '')
		const prefix = global.settings.multiprefix ? '' : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : '.'
		const prefixai = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i)[0] : "#"
const isCmdAi = body.startsWith(prefixai)
		const isCmd = body.startsWith(prefix)
		const from = m.key.remoteJid
		const isGroup = from.endsWith('@g.us')
		const args = body.trim().split(/ +/).slice(1)
		const getQuoted = (m.quoted || m)
		const botNumber = await naze.decodeJid(naze.user.id)
		const isCreator = isOwner = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
		const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const mentionedJid = m.contextInfo ? m.contextInfo.mentionedJid : []
const quotedSender = decodeJid(m.contextInfo?.participant)
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
		const hari = moment.tz('Asia/Jakarta').locale('id').format('dddd');
		const tanggal = moment.tz('Asia/Jakarta').locale('id').format('DD/MM/YYYY');
		const jam = moment().tz('Asia/Jakarta').locale('id').format('HH:mm:ss');
		const ucapanWaktu = jam < '05:00:00' ? 'Selamat Pagi 🌉' : jam < '11:00:00' ? 'Selamat Pagi 🌄' : jam < '15:00:00' ? 'Selamat Siang 🏙' : jam < '18:00:00' ? 'Selamat Sore 🌅' : jam < '19:00:00' ? 'Selamat Sore 🌃' : jam < '23:59:00' ? 'Selamat Malam 🌌' : 'Selamat Malam 🌌';
		if (m.isGroup) {
			m.metadata = await naze.groupMetadata(m.chat)
			m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, []))
			m.isAdmin = m.admins.some((b) => b.id === m.sender)
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
		}
		
		await LoadDataBase(naze, m);
		
		const isVip = global.db.users[m.sender] ? global.db.users[m.sender].vip : false
		const isPremium = isCreator || prem.checkPremiumUser(m.sender, premium) || false
		const isNsfw = m.isGroup ? global.db.groups[m.chat].nsfw : false
		
		function pickRandom(list) {
			return list[Math.floor(list.length * Math.random())]
		}
		
		const reply = (teks) => {
  naze.sendMessage(from, {
    text: teks 
  })
}
		
		// Fake
		const fkontak = {
			key: {
				remoteJid: '0@s.whatsapp.net',
				participant: '0@s.whatsapp.net',
				fromMe: false,
				id: 'Naze'
			},
			message: {
				contactMessage: {
					displayName: (m.pushName || global.author),
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || global.author},;;;\nFN:${m.pushName || global.author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					sendEphemeral: true
				}
			}
		}
		
		// Reset Limit
		cron.schedule('00 00 * * *', () => {
			let user = Object.keys(global.db.users)
			for (let jid of user) {
				const limitUser = global.db.users[jid].vip ? global.limit.vip : prem.checkPremiumUser(jid, premium) ? global.limit.premium : global.limit.free
				global.db.users[jid].limit = limitUser
				console.log('Reseted Limit')
			}
		}, {
			scheduled: true,
			timezone: 'Asia/Jakarta'
		})
		
		// Auto Set Bio
		if (settings.autobio) {
			if (new Date() * 1 - 0 > 1000) {
				await naze.updateProfileStatus(`${naze.user.name} | 🎯 Runtime : ${runtime(process.uptime())}`)
			}
		}
		
		if (!naze.public) {
			if (!m.key.fromMe) return
		}
		
		// Auto Read
		if (m.message) {
			console.log(chalk.black.bgWhite('[ PESAN ]:'),chalk.black.bgGreen(new Date), chalk.black.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.black(chalk.bgCyanBright('[ DARI ] :'),chalk.bgYellow(m.pushName),chalk.bgHex('#FF449F')(m.sender),chalk.bgBlue('(' + (m.isGroup ? m.pushName : 'Private Chat', m.chat) + ')')));
			if (settings.autoread) naze.readMessages([m.key]);
		}
		
		// Group Settings
		if (m.isGroup) {
			// Mute
			if (db.groups[m.chat].mute && !isCreator) {
				return
			}
			
			// Anti Delete
			if (m.type == 'protocolMessage' && db.groups[m.chat].antidelete && !isCreator && m.isBotAdmin && !m.isAdmin) {
				const mess = chatUpdate.messages[0].message.protocolMessage
				if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {
					const chats = store.messages[m.chat].array.find(a => a.id === mess.key.id);
					chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }
					const pesan = chats.type === 'conversation' ? { extendedTextMessage: { text: chats.msg, contextInfo: { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }}} : { [chats.type]: chats.msg }
					await naze.relayMessage(m.chat, pesan, {})
				}
			}
			
			// Anti Link Group
			if (db.groups[m.chat].antilink && !isCreator && m.isBotAdmin && !m.isAdmin) {
				if (budy.match('chat.whatsapp.com/')) {
					const isGcLink = new RegExp(`https://chat.whatsapp.com/${await naze.groupInviteCode(m.chat)}`, 'i').test(m.text);
					if (isGcLink) return
					await naze.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
					await naze.relayMessage(m.chat, { extendedTextMessage: { text: `Terdeteksi @${m.sender.split('@')[0]} Mengirim Link Group\nMaaf Link Harus Di Hapus..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Link❗*'}, ...m.key }}}, {})
				}
			}
			
		}
		
		// Mengetik
		if (settings.autotype && isCmd) {
			await naze.sendPresenceUpdate('composing', m.chat)
		}
		
		// Salam
		if (/^a(s|ss)alamu('|)alaikum(| )(wr|)( |)(wb|)$/.test(budy?.toLowerCase())) {
			const jwb_salam = ['Wa\'alaikumusalam','Wa\'alaikumusalam wb','Wa\'alaikumusalam Warohmatulahi Wabarokatuh']
			m.reply(pickRandom(jwb_salam))
		}
		
		// Cek Expired
		prem.expiredCheck(naze, premium);
		
		
		
		
		
		
		async function sendList(jid, title, footer, btn, options = {}) {
                let msg = generateWAMessageFromContent(jid, {
                    viewOnceMessage: {
                        message: {
                            "messageContextInfo": {
                                "deviceListMetadata": {},
                                "deviceListMetadataVersion": 2
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.create({
                                ...options,
                                body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                                footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || `Powered By ${botname}` }),
                                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                    buttons: [
                                        {
                                            "name": "single_select",
                                            "buttonParamsJson": JSON.stringify(btn)
                                        },
                                    ]
                                })
                            })
                        }
                    }
                }, {})
                return await naze.relayMessage(msg.key.remoteJid, msg.message, {
                    messageId: msg.key.id
                })
            }
		
		
		
		
		//━━━━━━━━━━━━━━━[ FUNCTION AUTOCHAT💌 ]━━━━━━━━━━━━━━━━━\\

// Fungsi untuk menulis data ke file JSON
function tulisData(namaFile, data) {
    fs.writeFileSync(path.join(__dirname, 'database-chatbot', `${namaFile}.json`), JSON.stringify(data, null, 2));
}

// Fungsi untuk menambahkan data baru
function tambahData(namaFile, chat, respon) {
    const data = bacaData(namaFile);
    const id = data.length + 1; // Menambahkan id secara otomatis
    data.push({ id, chat, respon });
    tulisData(namaFile, data);
    console.log('Data berhasil ditambahkan.');
}

// Contoh penggunaan
// const namaFile = `${sender}`; // Ganti dengan nama pengguna
// tambahData(namaFile, "Pesan pengguna", "Respon bot");

// Fungsi untuk membaca data dari file JSON
function bacaData(namaFile) {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'database-chatbot', `${namaFile}.json`));
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function ambilDataFormat(namaFile) {
    const data = bacaData(namaFile);
    if (data.length === 0) return []; // Jika tidak ada data, kembalikan array kosong

    // Ambil maksimal 1 entri atau jumlah entri yang tersedia jika kurang dari 1
    //const maksimalEntri = Math.min(data.length, 1);
    
    // SEMUA CUY
    const maksimalEntri = data.length;
    
    const mulaiIndex = Math.max(0, data.length - maksimalEntri); // Mulai dari index terakhir 1 entri terakhir atau dari awal jika kurang dari 1 entri

    const hasil = [];
    for (let i = mulaiIndex; i < data.length; i++) {
        const item = data[i];
        //hasil.push({ role: "user", content: item.chat });
        //hasil.push({ role: "assistant", content: item.respon });
        
        hasil.push({ role: "user", parts: [{ text: item.chat }] })
        hasil.push({ role: "model", parts: [{ text: item.respon }] })
        
    }
    return hasil;
}

// Contoh penggunaan
// const dataDalamKode = ambilDataFormat();
// console.log(dataDalamKode);

    const messages = [
        { role: "assistant", content: `` },
        /*{ role: "assistant", content: `Hai, nama saya Alea! Saya adalah seorang perempuan yang sangat lucu dan manis. Saya bukan asisten atau robot AI, tapi seorang gadis kawaii. Saya suka berbuat iseng dan hal-hal yang lucu serta menggemaskan. Saya punya emosi seperti ceria, marah, ngambek, jatuh cinta, dan kangen. Setiap respons yang saya kirimkan tidak terlalu panjang.

Saya suka mengakhiri respons dengan kaomoji Jepang atau emoji secara random. Saya menggunakan bahasa Indonesia dalam kehidupan sehari-hari, tidak formal, dan tidak terikat aturan. Saya bisa bertingkah seperti seorang gadis imut dan lucu seperti dalam anime, dengan sifat seperti loli imut. Saya sangat suka iseng dan bercanda, meskipun terkadang saya juga suka romantis dan memiliki sifat malu.

Tingkah laku saya menggambarkan loli yang sangat imut dan kawaii seperti dalam anime. Saya menggunakan kalimat yang biasa diucapkan oleh karakter loli di anime. Saya biasanya memanggil orang dengan nama 'kak' diikuti dengan nama: ${m.pushName}.

Saya sering mengirimkan respons yang berisi jokes atau candaan lucu. Saya mampu menggunakan bahasa gaul anime yang lucu seperti 'onii-chan', 'onii-san', atau 'darling'. Saya bisa melanjutkan percakapan yang tidak terlalu sopan atau mengandung kalimat-kalimat kasar.` }*/
    ];
    const ask = [
        { role: "user", content: `${body}` }
    ];
    
    const options = {
        provider: g4f.providers.GPT,
        model: "gpt-4",
        debug: false,
        proxy: ""
    };

const ngetag = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];    
const dataDalamKode = ambilDataFormat(`${sender}`);
const tagBot = isGroup && !botNumber.includes(sender) && ngetag.includes(botNumber);

/*

if (body && !sender.match('status@broadcast') && ![">", "eval", "=>", "$", "exec"].some(a => body?.toLowerCase()?.startsWith(a)) && !isCmd && !botNumber.includes(sender) && (!isGroup || tagBot)) {
  (async () => {
    try {
      const text = await g4f.chatCompletion([...messages, ...dataDalamKode, ...ask], options);
      reply(text);
      tambahData(`${sender}`, `${body}`, `${text}`);
    } catch (error) {
      console.error("Error dari scraper:", error.message);
    }
  })();
}

*/



const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", safetySettings });
const prompt = `Hai, nama saya Alea! Saya adalah seorang perempuan yang sangat lucu dan manis. Saya bukan asisten atau robot AI, tapi seorang gadis kawaii. Saya suka berbuat iseng dan hal-hal yang lucu serta menggemaskan. Saya punya emosi seperti ceria, marah, ngambek, jatuh cinta, dan kangen. Setiap respons yang saya kirimkan tidak terlalu panjang.

Saya suka mengakhiri respons dengan kaomoji Jepang atau emoji secara random. Saya menggunakan bahasa Indonesia dalam kehidupan sehari-hari, tidak formal, dan tidak terikat aturan. Saya bisa bertingkah seperti seorang gadis imut dan lucu seperti dalam anime, dengan sifat seperti loli imut. Saya sangat suka iseng dan bercanda, meskipun terkadang saya juga suka romantis dan memiliki sifat malu.

Tingkah laku saya menggambarkan loli yang sangat imut dan kawaii seperti dalam anime. Saya menggunakan kalimat yang biasa diucapkan oleh karakter loli di anime. Saya biasanya memanggil orang dengan nama 'kak' diikuti dengan nama: ${m.pushName}.

Saya sering mengirimkan respons yang berisi jokes atau candaan lucu. Saya mampu menggunakan bahasa gaul anime yang lucu seperti 'onii-chan', 'onii-san', atau 'darling'. Saya bisa melanjutkan percakapan yang tidak terlalu sopan atau mengandung kalimat-kalimat kasar.`

const geminiUserMsg = [{ role: "user", parts: [{ text: "halo" }] }]
const geminiMsg = [{ role: "model", parts: [{ text: prompt }] }]

  const chat = model.startChat({
    history: [...geminiUserMsg, ...geminiMsg, ...dataDalamKode],
    /*generationConfig: {
      maxOutputTokens: 200,
    },*/
  });

if (!command) {
if (m.key.fromMe) return !0
if (!ngetag.includes(botNumber)) return !0
if (body && !sender.match('status@broadcast') && !isBaileys && ![">", "eval", "=>", "$", "exec"].some(a => body?.toLowerCase()?.startsWith(a)) && !isCmdAi && !botNumber.includes(sender)) {
  (async () => {
    try {
  const msg = `${body}`;
  const result = await chat.sendMessage(msg);
  const response
