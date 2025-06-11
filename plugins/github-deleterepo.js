const { Octokit } = require("@octokit/rest");

let handler = async (m, { args }) => {
  const githubToken = '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'
  const username = 'Riski0929'
  const octokit = new Octokit({ auth: githubToken });

  if (!args[0]) return m.reply('Contoh: deleterepo Tes atau deleterepo Tes/file.js');

  const input = args[0].split('/');
  const repoName = input.shift();
  const filePath = input.join('/');

  try {
    // Ambil semua repo pakai paginate
    const repos = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      per_page: 100
    });

    const targetRepo = repos.find(repo => repo.name.toLowerCase() === repoName.toLowerCase());

    if (!targetRepo) {
      const list = repos.map(r => `│ ${r.name}`).join('\n');
      return m.reply(`Repository dengan nama ${repoName} tidak ada.\nBerikut daftar repo:\n${list}`);
    }

    if (!filePath) {
      // Hapus seluruh repository
      await octokit.rest.repos.delete({
        owner: username,
        repo: repoName
      });
      return m.reply(`Berhasil menghapus repository ${repoName}.`);
    } else {
      // Hapus file dari repository
      const res = await octokit.rest.repos.getContent({
        owner: username,
        repo: repoName,
        path: filePath
      });

      const sha = res.data.sha;

      await octokit.rest.repos.deleteFile({
        owner: username,
        repo: repoName,
        path: filePath,
        message: `Menghapus ${filePath}`,
        sha
      });

      return m.reply(`Berhasil menghapus file ${filePath} dari repo ${repoName}.`);
    }

  } catch (e) {
    return m.reply(`Gagal menghapus: ${e.message}`);
  }
};

handler.help = ['deleterepo [repo/nama/path]']
handler.tags = ['owner']
handler.command = ['deleterepo']
handler.owner = true
handler.botutama = true

module.exports = handler;