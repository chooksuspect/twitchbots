const { Client, MessageEmbed, MessageActionRow, Message, MessageAttachment } = require("discord.js");
const { get, default: axios } = require("axios");
const { green, cyan, magenta } = require("colorette");
const { Timestamp } = require("@sapphire/time-utilities");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const prefix = "!"

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ]
});

const BOT_VERSION = "1.0.0";

client.once("ready", () => {
    const timestamp = `[${cyan(new Timestamp("YYYY-MM-DD HH:mm:ss"))}]:`;
    console.log(`${timestamp} ${green("READY")} | Logged in as ${client.user.tag}!`);
})

client.on("messageCreate", async (message) => {
    const { content, author, channel } = message;

    if (author.bot) return;

    if (content.indexOf(prefix) !== 0) return;

    const args = content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "bots"){
        if (!args[0] || typeof args[0] !== "string") {
            return message.channel.send("Por Favor, Dame el Nombre");
        }
        args[0] = args[0].toLowerCase()
        try {
            let temp = await get(`API`);
            const resp = temp.data.data.bots;
            message.channel.send(`${args[0]} Tiene `+ resp+ " Bots En Este Momento" )
            message.channel.send('Recuerda que si el Streamer no esta en Vivo, Esto puede ser Incorrecto!')
            console.log(resp)
        }
        catch{
            message.channel.send('Ha Habido Un Error, Comprueba El Nombre y Asegurate Que Esta En Vivo') 
        }

        
    }


});

// function which log in the bot
client.login("TOKEN");
