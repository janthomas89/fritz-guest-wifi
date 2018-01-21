import Vue from 'vue';
import { mapState } from 'vuex';

Vue.component('wifi-loading', {
    computed: mapState('guestWifi', {
        loading: function(state) {
            return state.loading;
        }
    }),
    template: `
        <div class="progress" v-if="loading">
            <div class="progress-bar progress-bar-striped active">
                <span class="glyphicon glyphicon-stats"></span>
                Loading Guest Wifi Status
            </div>
        </div>
    `
});
