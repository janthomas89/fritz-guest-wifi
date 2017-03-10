const util = require('./util');
const config = util.loadConfig();

const webAppConfig = Object.assign({
    port: 3000
}, config.webApp || {});

const express = require("express");
const app = express();
const viewBasePath = __dirname + '/views/';

// Static routes
app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./public'));

// Ajax routes
app.get("/status", async function(req, res) {
    const status = await util.getGuestWifiSettings();
    res.json(status);
});
app.post("/enable", async function(req, res) {
    const password = util.generatePassword(8);
    const status = await util.activateGuestWifi(config.guestWifi, password);
    res.json(status);
});

// Fallback route
app.use("*", function(req, res) {
    res.sendFile(viewBasePath + "index.html");
});

app.listen(webAppConfig.port, function() {
    util.init(config.fritzBox);
    console.log("FRITZ!Box guest wifi app up and running on port " + webAppConfig.port);
});