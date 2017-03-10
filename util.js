const FritzBoxAPI = require('fritz-box').default;
const crypto = require('crypto');

var api;

// ToDo
var guestWifi = {
    autoDisable: true,
    deactivateAfter: '30',
    waitForLastGuest: true
};

/**
 * Loads the configuration file under /conf/config.js
 * 
 * @return Object
 */
exports.loadConfig = function() {
    const configModuleName = './conf/config';
    try {
        console.log(require.resolve(configModuleName));
    } catch(e) {
        console.error('Cannot resolve configuration. Please provide a configuration file under /conf/config.js');
        process.exit(e.code);
    }
    return require(configModuleName);
};

/**
 * 
 */
exports.init = function(box) {
    api = new FritzBoxAPI({
        username: box.username,
        password: box.password,
        host: box.host || 'fritz.box'
    });
};

/**
 * Activates the FRITZ!Box guest wifi using the given password.
 * 
 * @param guestWifiConfig The guest wifi configuration.
 * @param password The guest wifi password.
 */
exports.activateGuestWifi = async function(guestWifiConfig, password) {
    console.log("[start] activate guest wifi");
    console.log("password:", password);

    let guestWifiSettings = await exports.getGuestWifiSettings();

    guestWifiConfig = Object.assign({
        autoDisable: true,
        deactivateAfter: '30',
        waitForLastGuest: true
    }, guestWifiConfig || {});

    guestWifiSettings.autoDisable = guestWifiConfig.autoDisable;
    guestWifiSettings.deactivateAfter = guestWifiConfig.deactivateAfter;
    guestWifiSettings.waitForLastGuest = guestWifiConfig.waitForLastGuest;
    guestWifiSettings.key = password;
    guestWifiSettings.active = true;

    await api.setGuestWLAN(guestWifiSettings);

    guestWifiSettings = await exports.getGuestWifiSettings();
    console.log("[done]\n\n");
    return guestWifiSettings;
};

/**
 * Retrieves the guest wifi settings.
 * 
 * @return Object
 */
exports.getGuestWifiSettings = async function() {
    let guestWifiSettings = null;
    try {
        guestWifiSettings = await api.getGuestWLAN();
        console.log("session already established");
    } catch(e) {
        console.log("session not yet established or timed out");

        const sessionId = await api.getSession();
        console.log("session (re)established: ", sessionId);

        guestWifiSettings = await api.getGuestWLAN();
    }

    console.log("retrieved guest wifi settings:");
    console.log(guestWifiSettings);

    return guestWifiSettings;
};

/**
 * Generates a random password for the given length.
 * 
 * @param Number
 * @return String
 */
exports.generatePassword = function(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charsLength = chars.length;

    const randomBytes = crypto.randomBytes(length);
    const result = new Array(length);

    var cursor = 0;
    for (var i = 0; i < length; i++) {
        cursor += randomBytes[i];
        result[i] = chars[cursor % charsLength];
    }

    return result.join('');
};