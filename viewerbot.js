const { Client, MessageEmbed, MessageActionRow, Message, MessageAttachment } = require("discord.js");
const { get, default: axios } = require("axios");
const { green, cyan, magenta } = require("colorette");
const { Timestamp } = require("@sapphire/time-utilities");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const prefix = "!"
const humanizeDuration = require("humanize-duration");

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
const cooldowns = new Map();
client.on("messageCreate", async (message) => {
    const { content, author, channel } = message;

    if (author.bot) return;

    if (content.indexOf(prefix) !== 0) return;

    const args = content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    

    if(command === "freebot"){
        
        
        const cooldown = cooldowns.get(message.guildid);

        if (cooldown){
            const remaining = humanizeDuration(cooldown - Date.now());
            return message.channel.send(`Debes Esperar ${remaining} Para Poder Usar Este Comando`).catch(console.error);
            
        }

        cooldowns.set(message.guildid, Date.now() + 1200000);
        
        //const cooldown = cooldowns.get(message.guildid);


        if (!args[0] || typeof args[0] !== "string") {
            return message.channel.send("Por Favor, Dame el Nombre");
        }

        args[0] = args[0].toLowerCase()
        const { Cluster } = require('puppeteer-cluster');

        (async () => {
        
            let browserArgs = [
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080',
                '--hide-scrollbars',
                '--proxy-server=socks5://78.94.172.42:1080',
            ];
        
            // each new call to workerInstance() will
            // left pop() one element from this list
            // maxConcurrency should be equal to perBrowserOptions.length
            let proxies = await axios.get("http://pubproxy.com/api/proxy?limit=1&format=txt&http=true&country=US&type=http");
            let proxies1 = proxies.data;
            let proxies2 = await axios.get("http://pubproxy.com/api/proxy?limit=1&format=txt&http=true&country=US&type=http");
            let proxies3 = proxies2.data;
            let perBrowserOptions = [
                {
                    headless: true,
                    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                    ignoreHTTPSErrors: true,
                    args: browserArgs.concat([`--proxy-server=${proxies1}`])
                },
                {
                    headless: true,
                    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                    ignoreHTTPSErrors: true,
                    args: browserArgs.concat([`--proxy-server=${proxies3}`])
                },
            ];
        
            const cluster = await Cluster.launch({
                monitor: true,
                concurrency: Cluster.CONCURRENCY_BROWSER,
                maxConcurrency: 2,
                timeout: 900000,
                puppeteerOptions: {
                    headless: false,
                    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                    args: browserArgs,
                    ignoreHTTPSErrors: true,
                    //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                },
                perBrowserOptions: perBrowserOptions
            });
        
            // Event handler to be called in case of problems
            cluster.on('taskerror', (err, data) => {
                console.log(`Error crawling ${data}: ${err.message}`);
            });
        
            await cluster.task(async ({ page, data: url }) => {
                //const { launch, getStream } = require("puppeteer-stream");
                await page.goto(url);
                try {
                    await page.click('#root > div > div.Layout-sc-nxg1ff-0.bSuLAT > div.Layout-sc-nxg1ff-0.hVqkZv > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div.Layout-sc-nxg1ff-0.video-ref > div > div > div.Layout-sc-nxg1ff-0.fPrwsJ.player-overlay-background.player-overlay-background--darkness-0.content-overlay-gate > div > div.Layout-sc-nxg1ff-0.knaoBk.content-overlay-gate__allow-pointers > button > div > div')
                    await page.waitFor(900000);
                    console.log("Listo!")
                }
                catch {
                
                //const stream = await getStream(page, { audio: true, video: true });
                console.log("Error")    
                await page.waitFor(900000);
                }
                //const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
                //await delay(900000) /// waiting 1 second.
            });
        
            await cluster.queue(`https://twitch.tv/${args[0]}`);
            await cluster.queue(`https://twitch.tv/${args[0]}`);

            // many more pages
            message.channel.send("Los Bots Se Estan Enviando, Se Enviaran Entre 2 a 6 Viewers Por 15 Minutos, Recuerda Que Esta Herramienta Esta En Alpha y Puede Contener Errores!, Gracias!");
            message.channel.send("Puedes Volver A Usar Este Comando En 20 Minutos");
            await cluster.idle();
            await cluster.close();
        })();
  
        
        
    }

setTimeout(() => cooldowns.delete(message.guildid), 1200000);
});

// function which log in the bot
client.login("TOKEN");






