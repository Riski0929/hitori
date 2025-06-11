const { Octokit } = require('@octokit/rest')
const { downloadContentFromMessage } = require('baileys-zynn')
const fs = require('fs')
const path = require('path')
const { tmpdir } = require('os')

let handler = async (m, { args, naze }) => {
  const githubToken = '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'
  const username = 'Riski0929'
  const octokit = new Octokit({ auth: githubToken })

 const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage;

        if (!quotedMessage) return m.reply("Balas pesan dokumen dengan perintah ini.");

  if (!args[0]) return m.reply('Contoh: updaterepo Backup/index.js')

  const repoPath = args[0].split('/')
  const repo = repoPath.shift()
  const filepath = repoPath.join('/')

  let sha = null
  try {
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: username,
      repo,
      path: filepath,
    })
    sha = fileData.sha // Kalau ada file sebelumnya, simpan sha-nya
  } catch (e) {
    if (e.status !== 404) {
      return m.reply(`Gagal mengambil data: ${e.message}`)
    }
    // Kalau 404, artinya file belum ada → lanjut buat baru
  }

  try {
    const stream = await downloadContentFromMessage(quotedMessage, 'document')
    let buffer = Buffer.alloc(0)
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }

    const contentBase64 = buffer.toString('base64')

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: username,
      repo,
      path: filepath,
      message: `${sha ? 'update' : 'create'} ${filepath} via bot`,
      content: contentBase64,
      ...(sha ? { sha } : {})
    })

    m.reply(`Berhasil ${sha ? 'mengupdate' : 'membuat'} \`${repo}/${filepath}\` di GitHub.`)
  } catch (e) {
    console.error(e)
    m.reply(`Gagal upload file: ${e.message}`)
  }
}

handler.help = ['updaterepo [repo/path/file]']
handler.tags = ['owner']
handler.command = ['updaterepo']
handler.owner = true

module.exports = handler