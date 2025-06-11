const { exec } = require('child_process')
const fs = require('fs')
const { Octokit  } = require("@octokit/rest")
const moment = require("moment-timezone")
const path = require("path")

let handler = async (m, { naze, args, text, prefix, command }) => {
const botNumber = await naze.decodeJid(naze.user.id)
  const githubToken = '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'
  const username = 'Riski0929'
  const repo = 'Backup'
  const file_path = 'backup_project.zip'

  switch (args[0]?.toLowerCase()) {
    case 'on':
      global.db.set[botNumber].autobackup2 = true
      startAutoBackup(naze, m.chat)
      m.reply('Auto backup setiap 1 hari telah diaktifkan!')
      break
    case 'off':
      global.db.set[botNumber].autobackup2 = false
      if (global.autoBackupInterval) {
        clearInterval(global.autoBackupInterval)
        global.autoBackupInterval = null
      }
      m.reply('Auto backup telah dinonaktifkan!')
      break
    case 'now':
      m.reply('Memulai proses backup manual ke GitHub...')
      createBackup(naze, m, githubToken, username, repo, file_path)
      break
    default:
      let status = global.db.set[botNumber].autobackup2 ? 'Aktif' : 'Nonaktif'
      m.reply(`
Status Auto Backup : ${status}

Penggunaan :
${prefix}autobackup on - Mengaktifkan backup otomatis setiap 1 hari
${prefix}autobackup off - Menonaktifkan backup otomatis
${prefix}autobackup now - Melakukan backup manual sekarang
`.trim())
  }
}

function startAutoBackup(naze, chatId) {
  if (global.autoBackupInterval) clearInterval(global.autoBackupInterval)
  const githubToken = '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'
  const username = 'Riski0929'
  const repo = 'Backup'
  const file_path = 'backup_project.zip'
  global.autoBackupInterval = setInterval(() => {
    createBackup(naze, {
      chat: chatId,
      reply: (msg) => naze.sendMessage(chatId, { text: msg })
    }, githubToken, username, repo, file_path, true)
  }, 86400000)
}

function addFilesToArchive(archive, dir, base, excludeDirs) {
  const items = readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativePath = path.relative(base, fullPath)

    if (excludeDirs.some(ex => relativePath.startsWith(ex))) continue
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      archive.directory(fullPath, relativePath)
      addFilesToArchive(archive, fullPath, base, excludeDirs)
    } else {
      archive.file(fullPath, { name: relativePath })
    }
  }
}



async function createBackup(naze, m, githubToken, username, repo, file_path, isAuto = false) {
  try {
    const now = moment().tz('Asia/Jakarta')
    const newFileName = `${now.format('HH-mm-DD-MM-YYYY')}.zip`
   

    exec(`zip -r ${file_path} . -x "node_modules/*" "nazedev/*" "package-lock.json" ".npm/*" > /dev/null 2>&1`, { maxBuffer: 1024 * 1024 * 10 }, async (err) => {
      if (err) {
        const msg = `Gagal membuat zip: ${err.message}`
        return m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
      }

      fs.readFile(file_path, async (err, data) => {
        if (err) {
          const msg = `${err.message}`
          return m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
        }

        try {
          const octokit = new Octokit({ auth: githubToken })

          // Cek dulu apakah file udah ada
          let sha = null
          try {
            const res = await octokit.rest.repos.getContent({
              owner: username,
              repo: repo,
              path: file_path
            })
            sha = res.data.sha
          } catch (e) {
            // File tidak ada, lanjut
          }

          // Jika ada, hapus dulu
          if (sha) {
            await octokit.rest.repos.deleteFile({
              owner: username,
              repo: repo,
              path: file_path,
              message: 'Hapus file backup lama',
              sha: sha
            })
          }

          // Upload file baru
          await octokit.rest.repos.createOrUpdateFileContents({
            owner: username,
            repo: repo,
            path: file_path,
            message: isAuto ? 'Auto backup' : 'Manual backup',
            content: data.toString('base64')
          })

          const msg = `
┌─── Backup Berhasil ───
│ Waktu : ${now.format('DD-MM-YYYY HH:mm:ss')}
│ File : ${file_path}
│ Repo : ${username}/${repo}
│ Link : https://github.com/${username}/${repo}/blob/main/${file_path}
└────────────────────────`
          m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
        } catch (e) {
          const msg = `${e.message}`
          m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
        } finally {
          try { fs.unlinkSync(file_path) } catch (e) {}
        }
      })
    })
  } catch (e) {
    const msg = `${e.message}`
    m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
  }
}

handler.help = ['autobackup <on/off/now>']
handler.tags = ['owner']
handler.command = ['autobackup']
handler.owner = true

module.exports = handler