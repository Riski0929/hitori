/**
 *  ═══🗡️≪ DEMON CORE ≫🗡️═══
 *  @ Fitur/code: [npm|npmjs]
 *  @ Creator: [Dxyz - Putra]
 *  @ Name Bot: [Rin-Okumura]
 *  ═══🔥≪ 業火 ≫🔥═══
**/

const fetch = require('node-fetch')

let handler = async (m, {
    naze,
    prefix,
    command,
    text
}) => {
    if (!text) throw ' *[ ! ]* Query/Link Npm Nya?';
    if (text.includes('www.npmjs.com')) {
        const isDownload = m.args.includes('--download');

        if (isDownload) {
            let input = text.split(" --download").join("");
            const [link, version] = input.split(' ');
            const match = new URL(link);
            const packageName = match.pathname.split('/')[2];

            const result = await fetch(`https://registry.npmjs.org/${packageName}`).then(a => a.json());
            const file = await fetch(result.versions[version].dist.tarball).then(a => a.arrayBuffer());

            const matchh = new URL(link);
            const packageNamee = match.pathname.split('/')[2];
            naze.sendMessage(m.chat, {
                document: Buffer.from(file),
                mimetype: 'application/gzip',
                fileName: packageNamee + `.gzip`
            }, {
                quoted: m
            });
        } else {
            const match = new URL(text);
            const packageName = match.pathname.split('/')[2];
            const result = await fetch('https://registry.npmjs.org/' + packageName).then(a => a.json());
            const versions = Object.keys(result.versions);

            let caption = `✨ *Detail Package Versions* ✨\n`;
            caption += `📦 *Latest:* ${result['dist-tags'].latest}\n`;
            caption += `🕒 *Updated:* ${new Date(result.time.modified).toLocaleDateString()}\n\n`;
            caption += `📜 *Version History:*\n`;
            caption += '┌───────────────┐\n';

            versions.forEach((ver, i) => {
                const isLast = i === versions.length - 1;
                caption += `${isLast ? '└─ ' : '├─ '}${ver}\n`;
            });
            caption += `\n📁 Download File .npmjs <link> <versions> --download\n`
            caption += `"All versions available for your demonic needs!" - Rin`;

            await naze.reply(m.chat, caption, m);
        }
    } else {
        const search = await fetch(`https://registry.npmjs.org/-/v1/search?text=${text}`).then(a => a.json());

        let caption = `📦 *NPM Package Search Results* 🔍\n`;
        caption += `🔎 *Search Query:* baileys\n\n`;

        search.objects.forEach((pkg, index) => {
            caption += `✨ *Package ${index + 1}:* ${pkg.package.name}\n`;
            caption += `📝 *Description:* ${pkg.package.description || 'No description'}\n`;
            caption += `🏷️ *Keywords:* ${pkg.package.keywords?.join(', ') || 'None'}\n`;
            caption += `⬇️ *Downloads:* ${pkg.score.detail?.toLocaleString() || 'N/A'} (weekly)\n`;
            caption += `🔄 *Version:* ${pkg.package.version}\n`;
            caption += `📅 *Last Updated:* ${new Date(pkg.package.date).toLocaleDateString()}\n`;
            caption += `🔗 *Links:*\n`;
            caption += `   - npm: https://www.npmjs.com/package/${pkg.package.name}\n`;
            if (pkg.package.links?.repository) {
                caption += `   - Repo: ${pkg.package.links.repository}\n`;
            }
            if (pkg.package.links?.homepage) {
                caption += `   - Homepage: ${pkg.package.links.homepage}\n`;
            }
            caption += `\n━━━━━━━━━━━━━━━━━━\n`;
        });

        await naze.sendMessage(m.chat, {
    text: caption
}, { quoted: m });
    }
}

handler.command = ['npmdown']
handler.help = ['npm <link>', 'npmjs <link>']
handler.tags = ['downloader', 'internet']


module.exports = handler;