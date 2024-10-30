import express from 'express';
import dotenv from "dotenv";
import {sequelize} from "./database";
import path from "node:path";
import TelegramBot from "node-telegram-bot-api";
import {OpenAI} from "./open-api";

const app = express();
const port = 3008;

dotenv.config({
    path: path.resolve(__dirname, '..', '.env')
});

const initStorage = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initStorage()


const bot = new TelegramBot(
    String(process.env.BOT_API_KEY),
    {
        polling: true
    }
)
bot.onText(/\/thread/, async (msg: TelegramBot.Message) => {

    const chatId = msg.chat.id;
    const botUsername = await bot.getMe().then((me) => me.username);
    const username = msg.from?.username || msg.from?.first_name;

    if (Number(chatId) > 0) {
        bot.sendMessage(chatId, String(`Для побщения с ботом перейдите в группу`));
    }

    if (String(msg.text).includes(`@${botUsername}`) || msg.reply_to_message) {
        const threadId = await OpenAI.thread(chatId);
        bot.sendMessage(chatId, String(`@${username}, Новый тред создан`));
    }
});

bot.on('message', async (msg: TelegramBot.Message) => {

    if (String(msg.text).startsWith('/')) {
        return;
    }
    const chatId = msg.chat.id;

    const botUsername = await bot.getMe().then((me) => me.username);
    const username = msg.from?.username || msg.from?.first_name;

    if (Number(chatId) > 0) {
        bot.sendMessage(chatId, String(`Для побщения с ботом перейдите в группу`));
    }

    if (String(msg.text).includes(`@${botUsername}`)) {
        const text = String(msg.reply_to_message?.text ?? '') + ' ' + msg.text?.replace(String('@' + botUsername), ' ');
        const answer = await OpenAI.ask(chatId, String(text))
        bot.sendMessage(chatId, String(`@${username}, ${answer}`), {parse_mode: 'Markdown'});

    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
