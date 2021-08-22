import Vue from 'vue';
import Vuex from 'vuex';

import currencies from './modules/currencies';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},

    getters: {},

    mutations: {},

    actions: {},

    modules: {
        currencies
    },
});

export default store;
