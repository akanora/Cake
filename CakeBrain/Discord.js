var colors = require('colors');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

var previousMessages = [];
var userData = [];
const embed = new Discord.MessageEmbed()
.setColor('#ffc83d')
.setTitle('Cake')
.setURL('https://github.com/AuracleTech/Cake')
.setAuthor('Cake by Auracle Technologies')
.setDescription("Here's my list of commands")
.setThumbnail('https://github.com/AuracleTech/Cake/blob/main/icons/128x128.png?raw=true')
.addField("So here's my things", "```random```****-sadpog**** *doesn't do anything*\n\
```Modding```****-ban Name**** *Yeet someone from the server*\n****-kick Name**** *Yeet someone from the server but weaker*\n****-purge Amount**** *Start the purge*\n****-ping**** *Verify ur 1987 internet is okay*\
```Music```****-play Music**** *Wont play music*\n****-skip**** *Wont skip*\n****-repeat**** *Turn on/off loop, except it wont*\n\
by the way I lied there's none of these yet 🍰 here, be patient 🎂", true);

module.exports = class CakeDiscord {
	constructor(DISCORD_TOKEN) {
		this.DISCORD_TOKEN = DISCORD_TOKEN;
	}

	start() {
		client.on('ready', () => {
			console.log(colors.debug(`Cake Discord : Logged in as ${client.user.tag}`));
			client.user.setActivity("-help", { type: "WATCHING" });
			setInterval(function(){ userData.forEach(element => { element.pings = 0 }); }, 30*1000);
		});
		client.on('message', async message => {
			if(message.author.bot) return;

			//AuracleTech DM messages
		    if(message.channel.type === "dm" && message.author.id == '252858920886992897') await client.channels.cache.get('793738190371684364').send(message.content);

		    //When you see it
		    var wysi = Math.floor((Math.random() * 727) + 1);

		    var args = message.content.match(/[^_\W]+/g);
		    args = (args == null) ? "" : args.join(' ').toLowerCase().trim().split(/ +/g);
		    var command = (args != "" && message.content.charAt(0) === prefix) ? args.shift() : false;
		    var query = (args == "") ? "" : args.join(" ");
			//Commands
			if(command === `roll727`)await message.channel.send(`${message.author.username} rolls 727 point(s)`).then((msg) => { message.delete(); });
			if(command === `roll`) await message.channel.send(`${message.author.username} rolls ${wysi} point(s)`).then((msg) => { if(wysi == 727) msg.react('815977925441486908').catch((e) => { console.log(colors.oopsie(e)); }); message.delete(); });
		    if(command === `help`) return message.channel.send({ embed });
		    if(command === `joke`) await message.channel.send("ur life");
		    if(command === `ping`) {
		    	if(!userData.find(user => user.id === message.author.id)) userData.push({ id: message.author.id, pings:[] });
		    	userData.find(item => item.id === message.author.id).pings++;
		    	var userPings = userData.find(item => item.id === message.author.id).pings++;

		    	if(userPings > 4 && wysi <= (727/4)){
		    		if(wysi != 32)
		    			await message.channel.send('Alright... you won...');
		    		else
		    			await message.channel.send('AH! I won! ez pz 🍋 squeezy');
		    		userData.find(item => item.id === message.author.id).pings = 0;
		    	} else {
		    		if(wysi <= (727/12))
		    			await message.channel.send('Pong?');
		    		else
		    			await message.channel.send('Pong!');
		    	}
		    }
		    if(command === `stop`) await message.channel.send('*You do not have ownership.*').then((msg) => { setTimeout(function(){ message.delete(); msg.delete(); }, 2000); });
		    if(command === `pancake`) await message.channel.send('lol u really thought that was a command');
		    if(command === `plsimsodesperatebeingintrovert`) await message.channel.send('yes you are');
		    if(command === `sound`) await message.channel.send('', {files: ["https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"]});
		    if(command === `bloodbath`)
		    	message.delete()
		    	.then(() => {
		    		message.channel.send(`${message.author.username} started a **bloodbath**, starting **in 10.** ⚠ ***USE -STOP TO PREVENT*** ⚠`).then((msg) => {
			    		for (var i=10; i>=1; i--) {
					    	setTimeout(function(i){ msg.edit(`${message.author.username} started a **bloodbath**, starting **in ${i}.** ⚠ ***USE -STOP TO PREVENT*** ⚠`); }, (1300*(10-i)), i);
					    }
			    		setTimeout(function(){ msg.delete(); message.channel.send('', {files: ["https://media2.giphy.com/media/Ju7l5y9osyymQ/giphy.gif"]}); }, 10*1300);
		    		});
		    	});
		    if(args[0] == "gn" && wysi <= 14) await message.channel.send("good night d00d");
		    if(command === `hug` && wysi <= 50) await message.channel.send("i said no");
		    var ballsResults = ['yeah you probably should eat some cake for that', 'yep', 'Inconclusive', '\'a negative answer or decision, as in voting\' or put simply, no', 'Maybe', 'Maaaybe', 'Maaaaaaaaaaybe', 'Heck no', 'pathetic, no', 'incredible! YES!', 'good, good, yes', 'very possibly', 'no...', 'yes...', 'you decide', 'mayyyybbbYES yes I mean yes', 'I would say no but now I think about it, idk dude', 'what you just said, well issa lie, stop lying', 'ahhh yes I see yes', 'idk dood', 'nooooo', 'yeee', 'hahahahahahaha      no', 'holy yes', 'Chair. That\'s my answer,take it or leave it', 'Yesn\'t', 'I would say no 🎩', 'Man... no', 'Yes Gurl', 'Aight you listen to me, ask me this one more time I swear I\'ll rip ur balls', 'kek', 'FUCK YEAH', 'fuck no...', 'ask someone else', 'I don\'t think I can answer', 'I\'m not allowed to answer', 'No.', 'Yes!', 'Meh', 'oof no', 'do it', 'I\'d say no but I have to say yes', 'the answer is unknown', 'well, no.', 'well, yeah!', 'this question creamed my cake, yes','no', 'yes', 'definitively not', 'definitively', 'heck no', 'heck yea', 'what in the world is that question of course yes', 'maybe', 'I prefer not to answer', 'all I can say is I don\'t recommend it', 'at this point who cares, yes', 'life is meaningless, so maybe', 'oh yeah for sure', 'big oof, hell no', 'what are you even thinking, NO dude', 'I should stop this job, no dude no', 'please stop no', 'finally, yes', 'for once I have no clue', 'ask me again im deaf', 'ur spelling so bad I can\'t read but Ill guess yes', 'hmmmmm yes', 'hmmmmmmmm no', 'hmmmmmmmmmmmmmmmmmmmm yes', 'hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm no', 'wut        no', 'oh yeah baby'];
		    if(command === `727ball`)
		    	if(message.content.endsWith("?"))
		    		if(wysi == 666)
			    		await message.channel.send("Let me look at my crystal ball... hmmm ...........").then(msg => { setTimeout(async function() { await message.channel.send(`\`${ballsResults[Math.floor(Math.random() * ballsResults.length)]}\``); }, 3000); });
			    	else
			    		await message.channel.send(`\`${ballsResults[Math.floor(Math.random() * ballsResults.length)]}\``);
			    else
			    	await message.channel.send("Ur question looks like a statement pal");
			//Easter egg
		    previousMessages.push([message.author.id, message.content]);// && message.author.id != '603722955796512788'
		    if(previousMessages.length > 3) previousMessages.shift();
		    if(!command && previousMessages.length >= 3 && previousMessages[0] == previousMessages[1] && previousMessages[0] == previousMessages[2])
		        await message.channel.send(message.content).then(() => { previousMessages = []; }).catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("cake") && wysi == 72) await message.channel.send("a very nice cake for you");
		    if(args.includes("cant") && args.includes("aim")) await message.channel.send("You can improve your aim by uninstalling osu");
		    if(args[0] == "hi" && wysi <= 7) await message.channel.send("hi");
		    if(args.includes("kek") && wysi == 80) return await message.channel.send("KEK TRAIN 🍰").then(async () => { await message.channel.send("kek"); });
		    if(query.includes("bad cake") || query.includes("stupid cake") || query.includes("hate cake")) return await message.delete();
		    if(query.includes("im sad")) return await message.channel.send("if that can help I'm sad too, and I like u");
		    if(args.includes("pizza") && args.includes("pineapple")) return await message.delete().then(async () => { await message.channel.send("NO"); });
		    if(args.includes("eat") && args.includes("cake")) return await message.channel.send("nom");
		    //Reacts
		    if(wysi == 727) await message.react('823008724485406742').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("senko")) await message.react('824723382494429205').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("peppy") || args.includes("ppy")) await message.react('🧠').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("frog")) await message.react('🐸').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("cake")) await message.react('🍰').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("pie")) await message.react('🥧').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("princess")) await message.react('👑').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("bacon")) await message.react('🥓').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("creampie")) await message.react('😏').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("onion")) await message.react('🧅').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("cursed")) await message.react('823542794685251584').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("pancake")) await message.react('🥞').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("potato")) await message.react('🥔').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("pizza")) await message.react('🍕').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("simp")) await message.react('799525198788821002').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("pineapple")) await message.react('🍍').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("burger")) await message.react('🍔').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("fries")) await message.react('🍟').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("egg")) await message.react('🥚').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("cheese")) await message.react('🧀').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("smh")) await message.react('🙄').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("croissant")) await message.react('🥐').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("hat")) await message.react('🎩').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("itunes")) await message.react('🎵').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("mango")) await message.react('🥭').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("chicken")) await message.react('🐔').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("chocolate")) await message.react('🍫').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("beef")) await message.react('🐄').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("shit")) await message.react('💩').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("milk")) await message.react('🥛').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("wtf")) await message.react('799538201463226388').catch((e) => { console.log(colors.oopsie(e)); });
		    if(args.includes("gne")) await message.react('821349880747261974').catch((e) => { console.log(colors.oopsie(e)); });
		});
		client.login(this.DISCORD_TOKEN);
	}
};