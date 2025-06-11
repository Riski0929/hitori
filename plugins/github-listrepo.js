const { Octokit } = require("@octokit/rest")
const fs = require("fs")
const path = require("path")
const { Buffer } = require("buffer")

function isAudio(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return ['mp3'].includes(ext)
}

function isImage(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
}

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  switch (ext) {
    case 'js': return 'application/javascript'
    case 'json': return 'application/json'
    case 'txt': return 'text/plain'
    case 'md': return 'text/markdown'
    case 'html': return 'text/html'
    case 'css': return 'text/css'
    case 'mp3': return 'audio/mpeg'
    case 'jpg':
    case 'jpeg': return 'image/jpeg'
    case 'png': return 'image/png'
    case 'gif': return 'image/gif'
    case 'pdf': return 'application/pdf'
    case 'zip': return 'application/zip'
    default: return 'application/octet-stream' // fallback
  }
}

let handler = async (m, { args, naze }) => {
  const githubToken = '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'
  const username = 'Riski0929'
  const octokit = new Octokit({ auth: githubToken })

  try {
    if (!args[0]) {
      const repos = await octokit.rest.repos.listForAuthenticatedUser()
      let list = repos.data.map(r => `│ ${r.name}`).join('\n')
      return m.reply(`┌── Repo GitHub ──\n${list}\n└───────────────`)
    }

    const input = args[0].split('/')
    const repo = input.shift()
    const filePath = input.join('/')

    const res = await octokit.rest.repos.getContent({
      owner: username,
      repo,
      path: filePath || '',
    })

    if (Array.isArray(res.data)) {
      let files = res.data.map(item => {
        return `│ ${item.name}${item.type === 'dir' ? ' (folder)' : ''}`
      }).join('\n')

      return m.reply(`┌── Isi: ${repo}${filePath ? '/' + filePath : ''}\n${files}\n└───────────────`)
    } else {
      // File ditemukan, kirim sebagai dokumen
      const content = Buffer.from(res.data.content, 'base64')
      const filename = path.basename(filePath)
      
      const typefile = getMimeType(filename)
      
      const tempPath = path.join(__dirname, '..', 'tmp_' + Date.now() + '_' + filename)

      fs.writeFileSync(tempPath, content)
  
      await naze.sendMessage(m.chat, {
        document: fs.readFileSync(tempPath),
        fileName: filename,
        mimetype: typefile
      }, { quoted: m })
      
      if (isAudio(filename)) {
      await naze.sendMessage(m.chat, {
  audio: fs.readFileSync(tempPath),
  mimetype: typefile,
  ptt: false
}, { quoted: m })
}
      
      if (isImage(filename)) {
      await naze.sendMessage(m.chat, { image: fs.readFileSync(tempPath), caption: 'Nih gambar nya' }, { quoted: m })
      }

      fs.unlinkSync(tempPath)
    }
  } catch (e) {
    return m.reply(`Gagal mengambil data: ${e.message}`)
  }
}

handler.help = ['listrepo [repo/nama/path]']
handler.tags = ['owner']
handler.command = ['listrepo']
handler.owner = true

module.exports = handler