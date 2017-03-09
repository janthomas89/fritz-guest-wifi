const util = require('./util');
const crypto = require('crypto');

// Load configuration
const configModuleName = './conf/config';
try {
    console.log(require.resolve(configModuleName));
} catch(e) {
    console.error('Cannot resolve configuration. Please provide a configuration file under ' + configModuleName + '.js');
    process.exit(e.code);
}
const config = require(configModuleName);


// Test
(async function() {

    // ToDo Config += other settings
    util.init(config.fritzBox, {});

    const password = crypto.randomBytes(6).toString('hex'); // Min. 8 chars
    await util.activateGuestWifi('test1234');
    await util.activateGuestWifi(password);
})();
