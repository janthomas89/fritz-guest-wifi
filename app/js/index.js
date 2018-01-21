import 'bootstrap';
import 'css/style.css';

import Vue from 'vue';
import Vuex from 'vuex';

import GuestWifiModule from 'js/modules/guest-wifi.js';

import 'js/view/wifi-loading.js';
import 'js/view/wifi-enable.js';
import 'js/view/wifi-credentials.js';

Vue.use(Vuex);

const store = new Vuex.Store({});
store.registerModule(GuestWifiModule.name, GuestWifiModule);

const app = new Vue({
    el: '#app',
    store: store
});

store.dispatch('guestWifi/init');
