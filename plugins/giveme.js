let handler = async (m, { naze }) => {
    const user = global.db.users[m.sender];
    const args = m.text.split(' ');
    const item = args[1]; // Item yang diminta (diamond, money, limit)
    const jumlah = parseInt(args[2]); // Jumlah item yang diminta

    if (!item || !jumlah) {
        return m.reply('Silakan kirim perintah dengan format: `.giveme <item> <jumlah>`');
    }

    // Cek jika item valid
    const validItems = ['diamond', 'money', 'limit'];
    if (!validItems.includes(item)) {
        return m.reply('Item yang valid: diamond, money, limit');
    }

    // Simpan data permintaan ke global.db (pending) dan beri informasi ke user
    global.db.pendingGive = {
        step: 'awaitDetails',
        creator: '62895375577040@s.whatsapp.net', // ID owner
        target: m.sender,
        chat: m.chat,
        item: item,
        jumlah: jumlah,
        originalMsg: m
    };

    m.reply('Tunggu ya, permintaan hadiah kamu sedang dikirim ke owner untuk konfirmasi.');
    // Kirim pesan ke owner untuk konfirmasi
    await naze.reply('62895375577040@s.whatsapp.net', `Hai Owner,\n\nUser *@${m.sender.split('@')[0]}* meminta hadiah ${item} sebanyak *${jumlah}*.\n\nSilakan cek permintaan ini dan balas dengan *Terima* atau *Tolak* untuk memproses.`, m);
 
};

handler.help = ['giveme'];
handler.tags = ['game'];
handler.command = ['giveme']
module.exports = handler;