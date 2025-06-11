const { Octokit } = require("@octokit/rest");
const { Buffer } = require("buffer");
const { downloadContentFromMessage } = require("baileys-zynn");

let handler = async (m, { args, naze }) => {
  const githubToken = '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'
  const username = 'Riski0929'
  const octokit = new Octokit({ auth: githubToken });

  if (!args[0]) return m.reply('Masukkan nama repo. Contoh: createrepo Tes');

  const input = args[0].split('/');
  const repoName = input.shift();
  const filePath = input.join('/');

  try {
    let repoExists = false;
    try {
      await octokit.rest.repos.get({ owner: username, repo: repoName });
      repoExists = true;
    } catch (err) {
      if (err.status !== 404) {
        return m.reply(`Gagal mengecek repo: ${err.message}`);
      }
    }

    if (repoExists) {
      // Jika ingin upload file
      if (filePath && (m.quoted?.text || m.quoted?.message?.documentMessage)) {
        let contentBuffer;
        if (m.quoted?.text) {
          contentBuffer = Buffer.from(m.quoted.text, 'utf8');
        } else if (m.quoted?.message?.documentMessage) {
          const quotedMessage = m.quoted.message.documentMessage;
          const stream = await downloadContentFromMessage(quotedMessage, 'document');
          contentBuffer = Buffer.concat([]);
          for await (const chunk of stream) {
            contentBuffer = Buffer.concat([contentBuffer, chunk]);
          }
        }

        // Cek apakah file sudah ada
        let sha = null;
        try {
          const existingFile = await octokit.rest.repos.getContent({
            owner: username,
            repo: repoName,
            path: filePath
          });

          if (!Array.isArray(existingFile.data)) {
            sha = existingFile.data.sha;
          }
        } catch (e) {
          if (e.status !== 404) {
            return m.reply(`Gagal mengecek file: ${e.message}`);
          }
        }

        await octokit.rest.repos.createOrUpdateFileContents({
          owner: username,
          repo: repoName,
          path: filePath,
          message: sha
            ? `Memperbarui ${filePath}`
            : `Menambahkan ${filePath}`,
          content: contentBuffer.toString('base64'),
          ...(sha && { sha })
        });

        return m.reply(
          sha
            ? `File \`${filePath}\` sudah ada di repo \`${repoName}\` dan berhasil **diperbarui**.`
            : `Berhasil mengupload file baru ke \`${repoName}/${filePath}\`.`
        );
      }

      return m.reply(
        `Repository dengan nama \`${repoName}\` sudah ada.\nSilakan gunakan:\n• createrepo ${repoName}/namafile.js sambil balas codingan/dokumen`
      );
    }

    // Buat repo baru
    await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
      auto_init: true
    });

    return m.reply(
      `Berhasil membuat repo dengan nama \`${repoName}\`.\nSilakan gunakan:\n• createrepo ${repoName}/namafile.js sambil balas dokumen atau codingan.`
    );
  } catch (e) {
    return m.reply(`Gagal membuat repo atau upload file: ${e.message}`);
  }
};

handler.help = ['createrepo [repo/nama/path]'];
handler.tags = ['owner'];
handler.command = ['createrepo'];
handler.owner = true;

module.exports = handler;