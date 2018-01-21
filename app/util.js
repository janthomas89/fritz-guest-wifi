const FritzBoxAPI = require('fritz-box').default;
const crypto = require('crypto');

var api;

/**
 * 
 */
exports.init = function(box) {
    api = new FritzBoxAPI({
        username: box.username,
        password: box.password,
        host: box.host
    });
};

/**
 * Enables the FRITZ!Box guest wifi using the given password.
 * 
 * @param guestWifiConfig The guest wifi configuration.
 * @param password The guest wifi password.
 */
exports.enableGuestWifi = async function(guestWifiConfig, password) {
    console.log("[start] enable guest wifi");
    console.log("password:", password);

    let guestWifiSettings = await exports.getGuestWifiSettings();

    if (guestWifiSettings.active) {
        console.log("[skip] guest wifi already enabled\n\n");
        return guestWifiSettings;
    }

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