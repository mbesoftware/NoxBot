const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

	if (err) {

		console.error(err);
	}

	let jsFiles = files.filter(f => f.split(".").pop() === "js");

	if (jsFiles.length <= 0) {

		console.error("Komut Bulunamadı.");
		return;

	}

	console.log("Komutlar Yükleniyor...");

	jsFiles.forEach((f, i) => {

		let props = require(`./commands/${f}`);
		bot.commands.set(props.help.name, props);

	});
});

bot.on("ready", async () => {

	console.log(`NoxBot Saldırıya Hazır`);
	bot.user.setActivity(`With Knives`);

    bot.generateInvite({

        permissions: ['ADMINISTRATOR'],

    })
        .then(link => console.log(`${link}`));

});

bot.on("message", async message => { 

	if (message.author.bot) {

        return;

    }

	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);

	let cmd = bot.commands.get(command.slice(prefix.length));

	if (cmd) {

		cmd.run(bot, message, args);

	}
});

bot.login(botSettings.token);
