let handler = async (m, { naze, text, args, command }) => {
let index = global.roleid_id.indexOf(m.sender);
    if (index === -1) return m.reply("❌ Kamu tidak memiliki izin untuk mengubah role!");
    let roleawal = global.roleid[index]
    let [role] = text.split(" "); // Format: .setrole werewolf
    if (!role) return m.reply("⚠️ Format salah! Gunakan: .setrole role\nContoh: .setrole guardian");

    let validRoles = ["werewolf", "seer", "guardian", "warga", "sorcerer"];
    if (!validRoles.includes(role.toLowerCase())) return m.reply("❌ Role tidak valid! Pilih salah satu dari: " + validRoles.join(", "));

    global.roleid[index] = role.toLowerCase(); // Ubah role sesuai index ID pengirim
    m.reply(`✅ Role kamu berhasil diubah dari ${roleawal} menjadi *${role}*!`);
    }

handler.tags = ['game']
handler.help = ['setrole']
handler.command = ['setrole']

module.exports = handler