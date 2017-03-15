const util = require('./util');
const config = require('config')

const express = require("express");
const app = express();
const viewBasePath = __dirname + '/views/';

// Rate limiter to throttle requests that hit the FRITZ!Box
var RateLimit = require('express-rate-limit');
var apiLimiter = new RateLimit({
  windowMs: 10*1000,
  max: 4,
  delayMs: 0,
  message: "Too many requests, please try again later"
});
app.use('/api', apiLimiter);

// Static routes
app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./public'));

// Ajax routes
app.get("/api/status", async function(req, res) {
    try {
        const status = await util.getGuestWifiSettings();
        res.json(status);
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
});
app.post("/api/enable", async function(req, res) {
    try {
        const password = util.generatePassword(8);
        const status = await util.activateGuestWifi(config.get('guestWifi'), password);
        res.json(status);
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
});

// Fallback route
app.use("*", function(req, res) {
    res.sendFile(viewBasePath + "index.html");
});

app.listen(config.get('webApp.port'), function() {
    util.init(config.get('fritzBox'));
    console.log("FRITZ!Box guest wifi app up and running on port " + config.get('webApp.port'));
});