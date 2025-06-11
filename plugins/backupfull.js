const fs = require('fs')
const path = require('path')
const { Octokit } = require('@octokit/rest')
const moment = require('moment-timezone')

const excludeList = ['node_modules', 'nazedev', '.git', '.npm', 'package-lock.json']

let handler = async (m, { naze, args, prefix }) => {
  const botNumber = await naze.decodeJid(naze.user.id)
  const githubToken = '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'
  const username = 'Riski0929'
  const repo = 'Backup'

  switch (args[0]?.toLowerCase()) {
    case 'on':
      global.db.set[botNumber].autobackup2 = true
      startAutoBackup(naze, m.chat, githubToken, username, repo)
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
      createBackup(naze, m, githubToken, username, repo)
      break
    default:
      let status = global.db.set[botNumber].autobackup2 ? 'Aktif' : 'Nonaktif'
      m.reply(`
Status Auto Backup : ${status}

Penggunaan :
${prefix}autobackup on  - Mengaktifkan backup otomatis setiap 1 hari
${prefix}autobackup off - Menonaktifkan backup otomatis
${prefix}autobackup now - Melakukan backup manual sekarang
`.trim())
  }
}

function startAutoBackup(naze, chatId, githubToken, username, repo) {
  if (global.autoBackupInterval) clearInterval(global.autoBackupInterval)
  global.autoBackupInterval = setInterval(() => {
    createBackup(naze, {
      chat: chatId,
      reply: (msg) => naze.sendMessage(chatId, { text: msg })
    }, githubToken, username, repo, true)
  }, 86400000)
}

async function walkAndUpload(octokit, basePath, dir, username, repo) {
  const files = fs.readdirSync(dir)
  for (let file of files) {
    const fullPath = path.join(dir, file)
    const relativePath = path.relative(basePath, fullPath)

    if (excludeList.some(ex => relativePath.startsWith(ex))) continue

    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      await walkAndUpload(octokit, basePath, fullPath, username, repo)
    } else {
      const content = fs.readFileSync(fullPath).toString('base64')

      let sha = null
      try {
        const res = await octokit.rest.repos.getContent({
          owner: username,
          repo,
          path: relativePath
        })
        sha = res.data.sha
      } catch (_) {}

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: username,
        repo,
        path: relativePath,
        message: `Backup file: ${relativePath}`,
        content,
        ...(sha && { sha })
      })
    }
  }
}

async function createBackup(naze, m, githubToken, username, repo, isAuto = false) {
  try {
    const now = moment().tz('Asia/Jakarta')
    const octokit = new Octokit({ auth: githubToken })

    await walkAndUpload(octokit, '.', '.', username, repo)

    const msg = `
┌─── Backup Berhasil ───
│ Waktu : ${now.format('DD-MM-YYYY HH:mm:ss')}
│ Mode  : ${isAuto ? 'Auto' : 'Manual'}
│ Repo  : ${username}/${repo}
│ Link  : https://github.com/${username}/${repo}
└────────────────────────`
    m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
  } catch (e) {
    const msg = `${e.message}`
    m.reply ? m.reply(msg) : naze.sendMessage(m.chat, { text: msg })
  }
}

handler.help = ['backupfull <on/off/now>']
handler.tags = ['owner']
handler.command = ['backupfull']
handler.owner = true

module.exports = handler