const { exec } = require('child_process'); //Start PerformanceCalculator
const getUrls = require('get-urls'); //Retrieve beatmaps URLs
var validUrl = require('valid-url'); //Verify if URL is valid
const osu = require('node-osu'); //Retrieve players informations
const osuApi = new osu.Api(process.env.OSU_API_KEY, { notFoundAsError: true, completeScores: true })
const Banchojs = require("bancho.js"); //BanchoBot IRC
const bancho = new Banchojs.BanchoClient({ username: process.env.OSU_USERNAME, password: process.env.OSU_IRC_KEY });
var rp = require('request-promise'); //Request data from URL
const fs = require('fs'); //.osu file download
const download = (url, path, callback) => { rp(url, (err, res, body) => { rp(url).pipe(fs.createWriteStream(path)).on('close', callback); }); }
var colors = require('colors'); //Console Colors
colors.setTheme({ oopsie: ['brightRed', 'bold'], debug: 'brightGreen', pm: ['brightYellow', 'bold'], pmself: ['yellow', 'bold'], log: ['white'] });
const prettyMilliseconds = require('pretty-ms'); //Neat time display
var toFixed = require('tofixed'); //Round up numbers to X decimal
const modsBinary = { EZ: 2, HR: 16, DT: 64, HT: 256, NC: 64, } //Binary version of mods

module.exports = class CakeBancho {
	constructor(OSU_API_KEY, OSU_USERNAME, OSU_IRC_KEY, OSU_TOOLS_LOCATION) {
		this.width = 5;
	}

	start() {
		bancho.connect().then(() => {
	    console.log(colors.debug('Cake Bancho : Connection established'));
	    bancho.on("PM", (message) => {
	        //Display message
	        console.log((message.self) ? colors.pmself(`${message.user.ircUsername}: ${message.message}`) : colors.pm(`${message.user.ircUsername}: ${message.message}`));
	        if(message.self) return;

	        //Ping
	        if(message.message.indexOf("-ping") == 0)
	            message.user.sendMessage("pong.");

	        //Detect received beatmap and calcul PP
	        if(message.message.includes("osu.ppy.sh")) {
	            getUrls(message.message, {requireSchemeOrWww: false}).forEach(element => {
	                if(!validUrl.isUri(element)) return;
	                element = new URL(element);
	                if(element.hostname != "osu.ppy.sh") return;
	                var beatmapID = element.href.split("/");
	                beatmapID = beatmapID[beatmapID.length - 1].replace(/\D/g,'');
	                if(isNaN(beatmapID)) return;
	                var modsArgs = message.message.split("+").join("-").split("-"), mods = [];
	                modsArgs.forEach(mod => { 
	                    if(mod.includes("HD") || mod.includes("Hidden")) mods.push("HD");
	                    if(mod.includes("HR") || mod.includes("HardRock")) mods.push("HR");
	                    if(mod.includes("FL") || mod.includes("Flashlight")) mods.push("FL");
	                    if(mod.includes("NF") || mod.includes("NoFail")) mods.push("NF");
	                    if(mod.includes("EZ") || mod.includes("Easy")) mods.push("EZ");
	                    if(mod.includes("NC") || mod.includes("NightCore")) mods.push("NC");
	                    if(mod.includes("HT") || mod.includes("HalfTime")) mods.push("HT");
	                    if(mod.includes("DT") || mod.includes("DoubleTime")) mods.push("DT");
	                });
	                var filePath = (new Date().getTime() + ".osu"), modsConverted = [];
	                download(`https://osu.ppy.sh/osu/${beatmapID}`, filePath, () => {
	                    var acc100 = new Promise((resolve, reject) => { CalculatePerformancePoint(resolve, filePath, 100, mods); });
	                    var acc99 = new Promise((resolve, reject) => { CalculatePerformancePoint(resolve, filePath, 99, mods); });
	                    var acc98 = new Promise((resolve, reject) => { CalculatePerformancePoint(resolve, filePath, 98, mods); });
	                    var acc97 = new Promise((resolve, reject) => { CalculatePerformancePoint(resolve, filePath, 97, mods); });
	                    var acc95 = new Promise((resolve, reject) => { CalculatePerformancePoint(resolve, filePath, 95, mods); });
	                    Promise.all([acc100, acc99, acc98, acc97, acc95]).then((values) => {
	                        mods.forEach(mod => { if(modsBinary[mod] !== undefined) modsConverted.push(modsBinary[mod]); });
	                        osuApi.getBeatmaps({ b: beatmapID, mods: modsConverted }).then(beatmaps => {
	                            var duration = (mods.includes("DT")) ? toFixed(beatmaps[0].length.total/1.5, 0) : beatmaps[0].length.total;
	                            var bpm = (mods.includes("DT")) ? toFixed(beatmaps[0].bpm*1.5, 0) : beatmaps[0].bpm;
	                            message.user.sendMessage(`[https://osu.ppy.sh/b/${beatmaps[0].id} ${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}]] ${mods.join("")} | 95% ${toFixed(values[4].pp, 0)}pp | 97% ${toFixed(values[3].pp, 0)}pp | 98% ${toFixed(values[2].pp, 0)}pp | 99% ${toFixed(values[1].pp, 0)}pp | 100% ${toFixed(values[0].pp, 0)}pp | ${(prettyMilliseconds(duration * 1000, { colonNotation: true }))} ★${toFixed(beatmaps[0].difficulty.rating, 2)} ♫${bpm} AR${toFixed(values[0].AR, 2)} OD${toFixed(values[0].OD, 2)}`);
	                        });
	                        if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
	                    });
	                });
	            });
	        }

	        //Recommend a beatmap depending on rank and mods
	        if(message.message.indexOf("-r") == 0) console.log(colors.debug("Someone called -r command WIP"));
	    });
	}).catch((e) => { console.log(colors.oopsie(e)); });
	}
};

function CalculatePerformancePoint(resolve, filePath, accuracy, mods) {
    var cmdMods = '';
    mods.forEach(element => { cmdMods += ` -m ${element}`; });
    exec(`dotnet "${process.env.OSU_TOOLS_LOCATION}" simulate osu -a ${accuracy} ${filePath} -j${cmdMods.toLowerCase()}`, (error, stdout, stderr) => {
        if (error) { console.log(colors.oopsie(error.message)); return 0; }
        if (stderr) { console.log(colors.oopsie(stderr)); return 0; }
        resolve(JSON.parse(stdout), 0);
        return;
    });
};