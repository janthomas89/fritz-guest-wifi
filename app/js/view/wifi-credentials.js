import Vue from 'vue';
import { mapState } from 'vuex';
import $ from 'jquery';
import 'jquery.qrcode';

Vue.component('wifi-credentials', {
    computed: mapState('guestWifi', {
        visible: function(state) {
            return state.active && !state.loading;
        },
        ssid: function(state) {
            return state.ssid;
        },
        key: function(state) {
            return state.key;
        },
        qrstring: function() {
            var enc = 'WPA';
            var hidden = false;
            var qrstring = 'WIFI:S:' + escapeString(this.ssid || '') + ';T:' + enc + ';P:' + escapeString(this.key || '') + ';';
            if (hidden) {
                qrstring += 'H:true';
            }

            return qrstring + ';';
        }
    }),
    updated: function() {
        $('#qr-code-container').empty().qrcode(this.qrstring);
    },
    template: `
        <div v-if="visible">
            <div class="form-group text-center" id="qr-code-container">
                QR-Code
            </div>
            <div class="form-group" id="ssid-container">
                <label for="ssis">SSID:</label>
                <input type="text" class="form-control" id="ssid" disabled :value="ssid">
            </div>
            <div class="form-group" id="pw-container">
                <label for="pw">Password:</label>
                <input type="text" class="form-control" id="pw" disabled :value="key">
            </div>
        </div>
    `
});

var escapeString = function(string) {
    var to_escape = ['\\', ';', ',', ':', '"'];
    var hex_only = /^[0-9a-f]+$/i;
    var output = "";
    for (var i=0; i<string.length; i++) {
        if($.inArray(string[i], to_escape) != -1) {
            output += '\\'+string[i];
        }
        else {
            output += string[i];
        }
    }
    if (hex_only.test(output)) {
        output = '"'+output+'"';
    }
    return output;
};
