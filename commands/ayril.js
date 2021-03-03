const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        message.delete();
        message.guild.leave();

    } catch(e) {

        console.log(e.stack);

    }
}

module.exports.help = {

    name: "ayril",
    desc: "Leaves the server.",

}
