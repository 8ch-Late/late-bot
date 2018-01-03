const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
        .setThumbnail('https://avatars0.githubusercontent.com/u/34999684?s=96&v=4')
        .setAuthor('Latememes')
        .setDescription('The Github For Late-Bot')
        .setURL('https://github.com/8ch-Late/late-bot')
        .setColor('GREEN');
message.channel.send(embed);
return;
}

module.exports.help = {
        name:"github"
}
