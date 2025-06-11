const axios = require('axios');

const API_BASE_URL = 'https://zynnaa-api.hf.space/api/v1/tictactoe';


const startGame = async (username, level) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?username=${username}&start=${level}`);
        const gameData = response.data;
        return gameData.papan;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response.data.error;
        } else {
            return 'Aduh, ada masalah jaringan atau server nih.';
        }
    }
};


const makeMove = async (username, move) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?username=${username}&move=${move}`);
        const gameData = response.data;

        if (gameData.menang === false) {
            return gameData.papan;
        } else if (gameData.menang === true) {
            if (gameData.usermenang === true) {
                return `Cieee menang! Jago juga lu!\n\n${gameData.papan}`;
            } else if (gameData.usermenang === false) {
                return `Yah, kalah nih? Cupu ah, coba lagi deh!\n\n${gameData.papan}`;
            } else {
                return `Seri nih, lumayan lah!\n\n${gameData.papan}`;
            }
        } else {
            return "Duh, ada yang aneh sama respons API pas jalanin langkah.";
        }

    } catch (error) {
        if (error.response && error.response.status === 400) {
            return error.response.data.error;
        } else {
            return 'Aduh, ada masalah jaringan atau server nih.';
        }
    }
};


let handler = async (m, { naze, text, command }) => {
    const ttt = await startGame(m.sender, text || null);
    m.reply(`> tictactoe\n${ttt}`);
    db.game.tttai
};

handler.command = ['ttt-ai', 'tictactoe-ai'];
handler.help = ["tictactoe-ai"]
handler.tags = ["game"]
handler.owner = false;


handler.before = async (m, { naze, text, command }) => {
    if (m.quoted) {
        if (m.quoted.text && m.quoted.text.includes("tictactoe")) {
            const ttt = await makeMove(m.sender, m.text || null);
            return m.reply(`> tictactoe\n${ttt}`);
        }
    }
};

module.exports = handler;