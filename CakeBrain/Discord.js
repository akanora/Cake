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
function randomChance(min, max) { return ((Math.floor((Math.random() * max) + min)) == max) ? true : false; }
function randomNumber(min, max) { return Math.floor((Math.random() * max) + min); }

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

		    var args = message.content.match(/[^_\W]+/g);
		    args = (args == null) ? "" : args.join(' ').toLowerCase().trim().split(/ +/g);
		    var command = (args != "" && message.content.charAt(0) === prefix) ? args.shift() : false;
		    var query = (args == "") ? "" : args.join(" ");

			//Commands
			if(command === `roll727`) await message.channel.send(`${message.author.username} rolls 727 point(s)`).then((msg) => { message.delete(); });
			if(command === `roll`) {
				var random = randomNumber(1, 727);
				await message.channel.send(`${message.author.username} rolls ${random} point(s)`).then((msg) => { if(random == 727) msg.react('815977925441486908').catch((e) => { console.log(colors.oopsie(e)); }); message.delete(); });
		    }
		    if(command === `help`) return message.channel.send({ embed });
		    if(command === `ping`) {
		    	if(!userData.find(user => user.id === message.author.id)) userData.push({ id: message.author.id, pings:[] });
		    	userData.find(item => item.id === message.author.id).pings++;
		    	var userPings = userData.find(item => item.id === message.author.id).pings++;

		    	if(userPings > 4 && randomChance(1, 5)){
		    		if(randomChance(1, 40))
		    			await message.channel.send('Pong! AH! I won! ez pz 🍋 squeezy');
		    		else
		    			await message.channel.send('PonggoNOOOOo ..... Alright... you won...');
		    		userData.find(item => item.id === message.author.id).pings = 0;
		    	} else {
		    		if(randomChance(1, 10))
		    			await message.channel.send('Pong?');
		    		else
		    			await message.channel.send('Pong!');
		    	}
		    }
		    if(command === `8ball`) {
		    	var ballsResults = ['yeah you probably should eat some cake for that', 'yep', 'Inconclusive', '\'a negative answer or decision, as in voting\' or put simply, no', 'Maybe', 'Maaaybe', 'Maaaaaaaaaaybe', 'Heck no', 'pathetic, no', 'incredible! YES!', 'good, good, yes', 'very possibly', 'no...', 'yes...', 'you decide', 'mayyyybbbYES yes I mean yes', 'I would say no but now I think about it, idk dude', 'what you just said, well issa lie, stop lying', 'ahhh yes I see yes', 'idk dood', 'nooooo', 'yeee', 'hahahahahahaha      no', 'holy yes', 'Chair. That\'s my answer,take it or leave it', 'Yesn\'t', 'I would say no 🎩', 'Man... no', 'Yes Gurl', 'Aight you listen to me, ask me this one more time I swear I\'ll rip ur balls', 'kek', 'FUCK YEAH', 'fuck no...', 'ask someone else', 'I don\'t think I can answer', 'I\'m not allowed to answer', 'No.', 'Yes!', 'Meh', 'oof no', 'do it', 'I\'d say no but I have to say yes', 'the answer is unknown', 'well, no.', 'well, yeah!', 'this question creamed my cake, yes','no', 'yes', 'definitively not', 'definitively', 'heck no', 'heck yea', 'what in the world is that question of course yes', 'maybe', 'I prefer not to answer', 'all I can say is I don\'t recommend it', 'at this point who cares, yes', 'life is meaningless, so maybe', 'oh yeah for sure', 'big oof, hell no', 'what are you even thinking, NO dude', 'I should stop this job, no dude no', 'please stop no', 'finally, yes', 'for once I have no clue', 'ask me again im deaf', 'ur spelling so bad I can\'t read but Ill guess yes', 'hmmmmm yes', 'hmmmmmmmm no', 'hmmmmmmmmmmmmmmmmmmmm yes', 'hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm no', 'wut        no', 'oh yeah baby'];
		    	if(message.content.endsWith("?"))
		    		if(randomChance(1, 727))
			    		await message.channel.send("Let me look at my crystal ball... hmmm ...........").then(msg => { setTimeout(async function() { await message.channel.send(`\`${ballsResults[Math.floor(Math.random() * ballsResults.length)]}\``); }, 3000); });
			    	else
			    		await message.channel.send(`\`${ballsResults[randomNumber(0, ballsResults.length)]}\``);
			    else
			    	await message.channel.send("Ur question looks like a statement pal");
			}
		    //Reacts
		    const reactPairs = { "frog": "🐸", "cake": "🍰", "pie": "🥧", "princess": "👑", "bacon": "🥓", "onion": "🧅", "pancake": "🥞", "potato": "🥔", "pizza": "🍕", "pineapple": "🍍", "burger": "🍔", "fries": "🍟", "egg": "🥚", "cheese": "🧀", "croissant": "🥐", "hat": "🎩", "mango": "🥭", "chicken": "🐔", "chocolate": "🍫", "beef": "🐄", "poop": "💩", "milk": "🥛" }
		    if(args) args.forEach(arg => { if(reactPairs[arg] !== undefined) message.react(reactPairs[arg]).catch((e) => { console.log(colors.oopsie(e)); }); })
		});
		client.login(this.DISCORD_TOKEN);
	}
};