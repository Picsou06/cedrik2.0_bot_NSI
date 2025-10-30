const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const { EmbedBuilder } = require('discord.js');
const { incrementPawned } = require('../utils/setupDb');
const { env } = require("process");

module.exports = (client) => {
	const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

	for (const eventFolder of eventFolders) {
		let eventFiles = getAllFiles(eventFolder);
		eventFiles.sort();

		const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

		client.on(eventName, async (arg) => {
			for (const eventFile of eventFiles) {
				const eventFunction = require(eventFile);
				await eventFunction(client, arg);
			}
		});
	}
	
	client.on('messageCreate', (message) =>{
		if(message.content === 'jiggly'){
			message.channel.send('puff');
		}
	});

	client.on('messageCreate', async (message) => {
		if (message.author.bot) return;
		const content = message.content.toLowerCase();

		if (content === 'react please') {
			await message.react('😎');
			await message.react('👍');
		}
		if (content === 'geshin') {
			await message.delete();
		}
		if (/\bsigma\b/.test(content)) {
			if (message.author.id === '769610914135277629') {
				await message.channel.send('https://imgcdn.stablediffusionweb.com/2024/10/18/30c98f52-cd04-45ad-b8e1-cdec1508827b.jpg');
				incrementPawned(message.content, 'sigma', message.author.id);
			} else {
				await message.react('1325137637018964041');
				incrementPawned(message.content, 'sigma', message.author.id);
			}
		}
		if (/\bratio\b/.test(content)) {
			await message.react('🤏');
			await message.channel.send('https://tenor.com/view/uzui-better-gif-24953549');
			incrementPawned(message.content, 'ratio', message.author.id);
		}
		if (/\bfeur\b/.test(content)) {
			await message.delete();
			const gifmessage = await message.channel.send('https://c.tenor.com/DLDxBkiQ9IYAAAAd/tenor.gif');
			setTimeout(() => {
				gifmessage.delete();
			}, 10000);
			incrementPawned(message.content, 'feur', message.author.id);
		}
		if (/\bsus\b/.test(content)) {
			const gifmessage = await message.reply('https://tenor.com/view/among-us-sus-gif-2558655191726498734');
			setTimeout(() => {
				gifmessage.delete();
			}, 5000);
			incrementPawned(message.content, 'sus', message.author.id);
		}
		if (/\brickroll\b/.test(content)) {
			await message.channel.send('https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif');
			incrementPawned(message.content, 'rickroll', message.author.id);
		}
	});

	client.on('guildMemberAdd', async (member) => {
			const channelID = process.env.WELCOME_CHANNEL;
			const channel = member.client.channels.cache.get(channelID);
			if (!channel) {
					console.error("Channel not found!");
					return;
			}
	
			const user = member.user;
			const embed = new EmbedBuilder()
					.setTitle("CodeSensei")
					.setDescription(
							`Bienvenue au nouveau membre !\nBienvenue <@!${user.id}> sur le serveur CodeSensei ! 🎉\nN'oublie pas de te renommer afin qu'on puisse te reconnaître ! 👀`
					)
					.setImage("https://media1.tenor.com/m/_i9AUV0dv_0AAAAd/welcome-banner.gif")
					.setThumbnail(
							"https://cdn.discordapp.com/icons/1049270152023257088/a_63be243e9ce3d1aa86b80a0309d881ce.gif?size=1024"
					)
					.setColor("#00f531");
	
			try {
						await member.setNickname('not renamed');
						await channel.send({ embeds: [embed] });
						const welcomeMessage = await channel.send(`<@!${user.id}>`);
						await welcomeMessage.delete();
			} catch (error) {
					console.error("Failed to send welcome message:", error);
			}
	});

};
