const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const prefix = "!";
var dispatcher;

bot.login("YOUR_TOKEN_HERE");

const title =('Unknown Track');
const artist =('/Late/ Radio'); 

bot.commands = new Discord.Collection();

fs.readdir("./src/cmds/", (err, files) => {
        if(err) console.log(err);

let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
console.log("no commands to load");
return;
}

console.log(`loading ${jsfiles.length} files`)
jsfiles.forEach((f, i) => {
let props = require(`./src/cmds/${f}`);
console.log(`${i + 1}: ${f} loaded`);
bot.commands.set(props.help.name, props)
});
});

bot.on('ready', () => {
console.log(`${bot.user.username} joined`);
});

bot.on("message", async message => {
if(message.author.bot) return;

let messageArray = message.content.split(" ")
let command = messageArray[0];
let args = messageArray.slice(1);

if(!command.startsWith(prefix)) return;

let cmd = bot.commands.get(command.slice(prefix.length));
if(cmd) cmd.run(bot, message, args);

if(command === `${prefix}play`) {

if (message.member.voiceChannel) {
	message.member.voiceChannel.join()
	.then(connection => {
var song_name = args
dispatcher  = connection.playArbitraryInput(`http://8ch-late.github.io/${song_name}.mp3`);
dispatcher.setVolume(1);

let embed = new Discord.RichEmbed()
	.setTitle(`${title}`)
	.setAuthor(`${artist}`)
	.setFooter('PLAYING')
	.setColor('BLUE');
message.channel.send(embed);
})
} else {
message.reply("Join the Voice Channel First");
}
}

if(command === `${prefix}pause`) {

dispatcher.pause();

let embed = new Discord.RichEmbed()
	.setTitle(`${title}`)
	.setAuthor(`${artist}`)
	.setFooter('PAUSED')
	.setColor('RED');
message.channel.send(embed);
return;
}

if(command === `${prefix}resume`) {

dispatcher.resume();

let embed = new Discord.RichEmbed()
	.setTitle(`${title}`)
	.setAuthor(`${artist}`)
	.setFooter('PLAYING')
	.setColor('BLUE');
message.channel.send(embed);
return;
}

if(command === `${prefix}end`) {

dispatcher.destroy();

let embed = new Discord.RichEmbed()
	.setTitle(`${title}`)
	.setAuthor(`${artist}`)
	.setFooter('OVER')
	.setColor('ORANGE');
message.channel.send(embed);
return;
}
});
