import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

Vue.component('wifi-enable', {
    computed: mapState('guestWifi', {
        visible: function(state) {
            return !state.active && !state.loading;
        }
    }),
    methods: mapActions('guestWifi', {
        buttonClicked: 'enable'
    }),
    template: `
        <button class="btn btn-lg btn-success btn-block" type="submit" v-if="visible" v-on:click="buttonClicked">
            <span class="glyphicon glyphicon-chevron-right"></span>
            Enable Guest Wifi
        </button>
    `
});
