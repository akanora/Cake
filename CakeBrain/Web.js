var colors = require('colors'); //Console Colors
const fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");

/* HTTPS & HTTP SETUP */
var https = require('https');
var http = require('http');

/* SESSION SETUP */
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

module.exports = class CakeWeb {
	constructor(WEB_SSL_CERTIFICATE, WEB_SSL_CHAIN, WEB_SSL_PRIVATE_KEY, WEB_SESSION_SECRET) {
		this.WEB_SSL_CERTIFICATE = WEB_SSL_CERTIFICATE;
		this.WEB_SSL_CHAIN = WEB_SSL_CHAIN;
		this.WEB_SSL_PRIVATE_KEY = WEB_SSL_PRIVATE_KEY;
		this.WEB_SESSION_SECRET = WEB_SESSION_SECRET;
	}

	start() {
		app.set('view engine', 'pug');
		https.createServer({ cert: fs.readFileSync(this.WEB_SSL_CERTIFICATE), ca: fs.readFileSync(this.WEB_SSL_CHAIN), key: fs.readFileSync(this.WEB_SSL_PRIVATE_KEY) }, app).listen(443, () => console.log(colors.debug('Cake WEB : Listening port 443')));
		http.createServer(app).listen(80, () => console.log(colors.debug('Cake WEB : Listening port 80')));

		app.use(session({ genid: (req) => { return uuidv4() }, secret: this.WEB_SESSION_SECRET, resave: false, saveUninitialized: true, httpOnly: true, logged: false, secure: true }))

		app.use(rateLimit({ windowMs: 30 * 1000, max: 60 }));

		app.use(function(req, res, next){
			var request = decodeURI(req.path.replace(/(https?:\/\/)|(\/)+/g, "$1$2"))

			console.log(colors.log((req.headers['x-forwarded-for'] || req.connection.remoteAddress) + " -> " + req.originalUrl));

			if(!req.secure) return res.redirect('https://' + req.headers.host + req.url);

			if(request.split('.').pop().trim() == "pug") return notFound(res);

			if(!path.extname(request)) {
				if(fs.existsSync(path.join(__dirname, 'web', request))) {
					if(fs.existsSync(path.join(__dirname, 'web', request, 'index.pug')))
						return res.render(path.join(__dirname, 'web', request))
					else return notFound(res)
				} else return notFound(res)
			} else {
				if(fs.existsSync(path.join(__dirname, 'web', request)))
					return res.sendFile(path.join(__dirname, 'web', request))
				else return notFound(res)
			}
		})
	}
};

function notFound(res) { res.status(404).send('Unable to find the requested resource 404'); }