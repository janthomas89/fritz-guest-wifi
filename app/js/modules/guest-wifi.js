import $ from 'jquery';

const name = 'guestWifi';

const namespaced = true;

const state = {
    loading: false,
    active: false,
    ssid: '',
    key: '',
};

const actions = {
    init: function({ dispatch }) {
        dispatch('ajaxRequest', {
            method: 'get',
            url: '/api/status'
        });            
    },
    enable: function({ dispatch }) {
        dispatch('ajaxRequest', {
            method: 'post',
            url: '/api/enable'
        });
    },
    ajaxRequest: function({ commit }, options) {
        commit('loading', true);
        return $.ajax(options).then(function(res) {
            commit('status', res || {});
            commit('loading', false);
        });
    },
};

const mutations = {
    loading: function(state, value) {
        state.loading = !!value;
    },
    status: function(state, {active, ssid, key}) {
        state.active = !!active;
        state.ssid = ssid || '';
        state.key = key || '';
    },
};

export default {
    name: name,
    namespaced,
    state,
    actions,
    mutations
}
