let handler = m => m;

handler.before = async function (m, { naze }) {
    const pending = global.db.pendingGive;

    // Cek apakah ada yang menunggu dan yang balas adalah owner
    if (
        pending &&
        pending.step === 'awaitDetails' &&
        m.sender === pending.creator // creator = owner
    ) {
        const user = global.db.users[pending.target];

        // Antisipasi kalau user sudah tidak ada
        if (!user) {
            await naze.sendMessage(m.chat, { text: 'User tidak ditemukan dalam database.' });
            delete global.db.pendingGive;
            return;
        }

        const text = m.text?.toLowerCase();

        if (text === 'terima') {
            // Tambahkan hadiah ke user
            if (!user[pending.item]) user[pending.item] = 0;
            user[pending.item] += pending.jumlah;

            // Kirim pesan ke user
            await naze.reply(pending.chat, `Hadiah kamu berupa ${pending.jumlah} ${pending.item} telah *DITERIMA* oleh owner.`, pending.originalMsg);
        

            // Balas ke owner
            await m.reply(`Permintaan hadiah user @${pending.target.split('@')[0]} berhasil diproses. ${pending.item} ditambahkan.`)
          

            // Bersihkan data pending
            delete global.db.pendingGive;
            

        } else if (text === 'tolak') {
            // Kirim pesan ke user
            await naze.reply(pending.chat, `Maaf, permintaan hadiah kamu ditolak oleh owner. Silakan hubungi admin jika ini kesalahan.`, pending.originalMsg);


            // Balas ke owner
            await m.reply(`Permintaan hadiah user @${pending.target.split('@')[0]} telah ditolak.`);

            // Bersihkan data pending
            delete global.db.pendingGive;
        }
    }
};

module.exports = handler;