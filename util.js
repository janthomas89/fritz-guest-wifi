const FritzBoxAPI = require('fritz-box').default;


var api;

// ToDo
var guestWifi = {
    autoDisable: true,
    deactivateAfter: '30',
    waitForLastGuest: true
};

/**
 * 
 */
exports.init = function(box, guestWifi) {
    api = new FritzBoxAPI({
        username: box.username,
        password: box.password,
        host: box.host || 'fritz.box'
    });
};

/**
 * Activates the FRITZ!Box guest wifi using the given password.
 * 
 * @param password The guest wifi password.
 */
exports.activateGuestWifi = async function(password) {
    console.log("[start] activate guest wifi");
    console.log("password:", password);

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

    console.log("old guest wifi settings:");
    console.log(guestWifiSettings);

    guestWifiSettings.autoDisable = true;
    guestWifiSettings.deactivateAfter = '30';
    guestWifiSettings.waitForLastGuest = true;
    guestWifiSettings.key = password;
    guestWifiSettings.active = true;

    await api.setGuestWLAN(guestWifiSettings);

    guestWifiSettings = await api.getGuestWLAN();

    console.log("new guest wifi settings:");
    console.log(guestWifiSettings);
    console.log("[done]\n\n");

    return guestWifiSettings;
};