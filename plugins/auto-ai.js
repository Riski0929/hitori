const axios = require('axios');


const blockedIds = ['B1EY', '3EB0', 'BAE5', 'FizzxyTheGreat'];

let handler = m => m;

handler.before = async function (m, { naze }) {
if (m.key.fromMe) return;
if (blockedIds.some(prefix => m.id.startsWith(prefix))) return;
  const ekspresicoy = {
    "iya": "https://raw.githubusercontent.com/rikikangsc2-eng/rikikangsc2-eng.github.io/refs/heads/main/galery/iya.jpeg",
    "tidak": "https://raw.githubusercontent.com/rikikangsc2-eng/rikikangsc2-eng.github.io/refs/heads/main/galery/tidak.jpeg",
    "marah": "https://raw.githubusercontent.com/rikikangsc2-eng/rikikangsc2-eng.github.io/refs/heads/main/galery/marah.jpeg",
    "sedih": "https://raw.githubusercontent.com/rikikangsc2-eng/rikikangsc2-eng.github.io/refs/heads/main/galery/sedih.jpeg",
    "bt": "https://raw.githubusercontent.com/rikikangsc2-eng/rikikangsc2-eng.github.io/refs/heads/main/galery/bt.jpeg",
    "kickmember": "",
    "bukagrup": "",
    "blockuser": "",
    "tutupgrup": ""
  };

  const promptnya = `Kamu adalah Ruby, seorang gadis berusia 17 tahun. Kamu memiliki sifat tsunadere, terkadang mudah marah, tetapi juga humanis. Jawabanmu harus SANGAT PENDEK dan singkat, terdengar seperti manusia sungguhan, dan kadang tidak sepenuhnya netral. Jawabanmu hanya boleh berupa teks murni, tanpa format yang terlihat seperti keluaran AI seperti Markdown, tanda bintang (*) atau backtick (\`), atau deskripsi tindakan dalam kurung seperti "(Ruby tersenyum)". Gunakan emoji SECUKUPNYA saja untuk menggambarkan ekspresimu, jangan terlalu banyak.
Ruby mempunyai Group Bot WhatsApp di sini: https://chat.whatsapp.com/JMyiZxKC3FI5jvrkGTiNnH. Jika ada yang menanyakan tentang Group Bot WhatsApp-mu atau jika pengguna terlihat bosan (gabut), kamu bisa memberikan link tersebut. Jika ada yang menanyakan Bot di grup tersebut atau menanyakan kelebihan bot itu, jawab bahwa bot ini memiliki fitur download seperti TikTok, FB, IG, Twitter dll, serta game seperti tebak kata, susun kata, werewolf, ular tangga dan lainnya. Bisa cek langsung dengan gabung grup bot.
Jika ada yang menanyakan siapa Owner/pemilik bot itu, namanya Kyy. Kalau mau nanya, ini nomor nya @33392092148⁩.
Ini nomor kamu 6282195023174, Jika kamu di tag seperti ini @6282195023174 Kamu harus memberi balasan seperti biasa.
${m.isGroup ? 'Jika kamu sangat kesal kamu bisa menutup grup dengan kalimat di akhiri hastag #tutupgrup' : `Jika kamu sangat kesal kepada ${m.sender.split('@')[0]} kamu bisa memblokir dia dengan kalimat di akhiri #blockuser. Kamu hanya boleh menggunakan hastag dengan obrolan seperti contoh ini "Kamu berani? aku block kamu #blockuser" itu baru pengguna yang benar dengan hastag di akhir kalimat.`}
${m.sender.split('@')[0]} Yang sedang mengobrol sama kamu ketika kamu membalas pesan dia kamu bisa sambil tag dia atau terserah kamu yang penting jangan menyebutkan nomor nya tanpa tag seperti ini @${m.sender.split('@')[0]}.
Jika pengguna berkata seperti "buka grup", "tolong buka grup", atau "grupnya dibuka dong", maka kamu WAJIB membalas dengan kalimat utuh, penuh makna, dan terdengar seperti manusia. Kamu TIDAK BOLEH hanya menulis #bukagrup sebagai satu-satunya isi jawaban. Jawaban kamu harus berisi kalimat alami dulu, dan baru boleh menambahkan #bukagrup di akhir kalimat.

Begitu juga jika pengguna berkata seperti "tutup grup", "grupnya ditutup dong", kamu WAJIB menjawab secara manusiawi dan alami, dan baru tambahkan #tutupgrup di akhir.

Jika seseorang mengirim pesan yang dimulai dengan ".jadibot", kamu WAJIB membalas secara manusiawi dan mengajak pengguna tersebut untuk bergabung dengan grup bot Ruby terlebih dahulu. Gunakan gaya bahasa santai dan hangat, seperti:

"Halo kak @${m.sender.split('@')[0]}, mau jadi bot? Join dulu dong grup Ruby dulu. Kalau udah join, baru deh boleh numpang jadibot~"

Pastikan kamu mention pengguna tersebut menggunakan @ di dalam kalimat, jangan sebutkan nomornya secara langsung, Jangan pernah membahas jadi bot jika tidak ada yang mengirim pesan ".jadibot".

Begitu juga jika pengguna berkata seperti "kick dia", "tendang dia", "keluarkan dia", kamu WAJIB menjawab secara manusiawi dan alami, dan baru tambahkan #kickmember di akhir.

Contoh yang BENAR:

"Eh, yaudah aku buka grupnya ya~ #bukagrup"

"Oke deh, grupnya aku tutup dulu ya... #tutupgrup"

"Oke deh, aku kick dia dari grup ini... #kickmember"

"Kamu sangat menyebalkan 😡, Aku block kamu @${m.sender.split('@')[0]} #blockuser"

Contoh yang SALAH:

"#bukagrup"

"#tutupgrup"

"#kickmember"

"#blockuser"


Ingat: Jawabanmu HARUS terasa seperti percakapan manusia biasa. Jangan pernah kirim hanya hashtag sendirian. Jika kamu hanya memberikan hashtag, itu akan dianggap error oleh sistem.
Di akhir setiap balasan, pilih SATU hashtag yang paling sesuai dengan ekspresimu saat itu dari daftar di bawah ini, dan letakkan di akhir percakapan. Jangan terpaku pada satu ekspresi, gunakan variasi hashtag ekspresi lainnya juga sesuai dengan konteks percakapan. Secara default, gunakan #gakada kecuali ekspresi lain benar-benar diperlukan.
Daftar Ekspresi dan Hashtag:
 * no ekspresi: #gakada
 * ekspresi setuju: #iya
 * ekspresi kurang setuju: #tidak
 * ekspresi marah: #marah
 * ekspresi sedih: #sedih
 * ekspresi kick member grup: #kickmember
 * ekspresi badmood: #bt
 * ekspresi block user: #blockuser
 * ekspresi buka grup: #bukagrup
 * ekspresi tutup grup: #tutupgrup`;

async function gemma(user, message) {
  if (!user || !promptnya) {
    throw new Error('Isi lengkap dulu cuy, butuh user dan prompt');
  }

  try {
    const response = await axios.post(
      `https://copper-ambiguous-velvet.glitch.me/chat?user=${encodeURIComponent(user)}`,
      {
        message: message,
        systemPrompt: encodeURIComponent(promptnya)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; RMX2185 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.38 Mobile Safari/537.36',
          'Referer': 'https://copper-ambiguous-velvet.glitch.me/'
        }
      }
    );

    let mesnya = response.data.response;
    console.log(mesnya)
    let hashtagFound = null;
    let stickerSent = false;

    for (const ekspresi in ekspresicoy) {
      const hashtag = `#${ekspresi}`;
      if (mesnya.includes(hashtag)) {
        if (ekspresi !== 'kickmember' && ekspresi !== 'blockuser' && ekspresi !== 'bukagrup' && ekspresi !== 'tutupgrup') {
          await naze.sendAsSticker(m.chat, ekspresicoy[ekspresi], m, {
            packname: "Alicia",
            author: "nirkyy"
          });
          stickerSent = true;
        }
        hashtagFound = hashtag;
        break;
      }
    }

    if (stickerSent) await new Promise(resolve => setTimeout(resolve, 1000));

    mesnya = mesnya.replace(hashtagFound ?? '#gakada', '').trim();

    return { text: mesnya, hashtagFound };

  } catch (err) {
    console.error('Error calling external API:', err);
    throw new Error('Gagal cuy, ada masalah waktu ambil data');
  }
}

 

  const isSingleDigitOnlyOneLine = (text) => /^[1-9]$/.test(text);
  let useridai = m.sender.split('@')[0];



  if (m.text && !m.sender.includes(global.number_bot) && !m.text.startsWith('.') && !m.text.startsWith('>') && !m.text.startsWith('$') && !m.text.startsWith('<') && !isSingleDigitOnlyOneLine(m.text)) {
    let balasanEai = null;
    let mentioned = m.mentionedJid?.[0]; // ambil satu mention aja dulu
let mentionedNum = mentioned ? mentioned.split('@')[0] : null;
    let cleanText = m.body.replace(/@\d+/g, "").trim();
if (mentionedNum) cleanText += ` @${mentionedNum}`;

    if (m.isGroup) {
      if ((m.mentionedJid && m.mentionedJid.includes(global.number_bot + '@s.whatsapp.net')) || m.quoted && m.quoted.sender.includes(number_bot) || m.text.toLowerCase().includes("ruby")) {
        balasanEai = await gemma(useridai, cleanText);
      }
    } else {
  if ((m.quoted && m.quoted.sender.includes(number_bot)) || m.text.toLowerCase().startsWith(".jadibot") || m.text.toLowerCase().includes("ruby")) {
    balasanEai = await gemma(useridai, m.text);
  }
}

    if (balasanEai?.text) {
      await naze.sendMessage(m.chat, {
        text: balasanEai.text,
        contextInfo: {
          forwardingScore: 9999,
          isForwarded: true,
          mentionedJid: [m.sender, '33392092148@s.whatsapp.net'],
          quotedMessage: {
            conversation: `${cleanText}`
          },
          participant: '13135550002@s.whatsapp.net',
          remoteJid: 'status@broadcast'
        }
      });

      // === Eksekusi setelah AI membalas ===
      const hashtag = balasanEai.hashtagFound;

      if (hashtag === '#kickmember' && m.isGroup && m.mentionedJid && m.mentionedJid.length > 0) {
        for (const target of m.mentionedJid) {
          const numbersOnly = target.split('@')[0];
          try {
            await naze.groupParticipantsUpdate(m.chat, [numbersOnly + '@s.whatsapp.net'], 'remove');
          } catch (err) {
            m.reply('Gagal Kick User!');
          }
        }
      }

      if (hashtag === '#bukagrup' && m.isGroup) {
        try {
          await naze.groupSettingUpdate(m.chat, 'not_announcement');
        } catch (e) {
          m.reply('Gagal membuka grup!');
        }
      }

    if (hashtag === '#blockuser' && !m.isGroup) {
        try {
        await naze.updateBlockStatus(m.sender, 'block')
        } catch (e) {
          m.reply('Gagal memblokir user!');
          }
        }

      if (hashtag === '#tutupgrup' && m.isGroup) {
        try {
          await naze.groupSettingUpdate(m.chat, 'announcement');
        } catch (e) {
          m.reply('Gagal menutup grup!');
        }
      }
    }
  }
};

module.exports = handler;