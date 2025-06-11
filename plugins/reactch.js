let handler = async (m, { naze, text }) => {
    if (!text) return m.reply("Contoh:\n.reactch https://whatsapp.com/channel/xxx/123 ❤️falz\n.reactch https://whatsapp.com/channel/xxx/123 ❤️falz|5");

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const [mainText, offsetStr] = text.split('|');
    const args = mainText.trim().split(" ");
    const link = args[0];

    if (!link.includes("https://whatsapp.com/channel/")) {
        return m.reply("Link tidak valid!\nContoh: .reactch https://whatsapp.com/channel/xxx/idpesan ❤️Falz|3");
    }

    const channelId = link.split('/')[4];
    const rawMessageId = parseInt(link.split('/')[5]);
    if (!channelId || isNaN(rawMessageId)) return m.reply("Link tidak lengkap!");
    const offset = parseInt(offsetStr?.trim()) || 1;
    const teksNormal = args.slice(1).join(' ');
    const teksTanpaLink = teksNormal.replace(link, '').trim();
    if (!teksTanpaLink) return m.reply("Masukkan teks/emoji untuk direaksikan.");
    const emoji = teksTanpaLink.toLowerCase().split('').map(c => {
        if (c === ' ') return '―';
        return hurufGaya[c] || c;
    }).join('');

    try {
        const metadata = await naze.newsletterMsg(channelId);
        let success = 0, failed = 0;
        for (let i = 0; i < offset; i++) {
            const msgId = (rawMessageId - i).toString();
            try {
                await naze.newsletterReactMessage(metadata.id, msgId, emoji);
                success++;
            } catch (e) {
                failed++;
            }
        }
        m.reply(`✅ Berhasil kirim reaction *${emoji}* ke ${success} pesan di channel *${metadata.thread_metadata.name.text}*\n❌ Gagal di ${failed} pesan`);
    } catch (err) {
        console.error(err);
        m.reply("❌ Gagal memproses permintaan!");
    }
}

handler.command = ['reactch','x'];
module.exports = handler;