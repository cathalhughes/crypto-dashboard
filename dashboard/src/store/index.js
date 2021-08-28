import Vue from 'vue';
import Vuex from 'vuex';

import currencies from './modules/currencies';
import sentiment from './modules/sentiment';
import hodl from './modules/hodl';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},

    getters: {},

    mutations: {},

    actions: {},

    modules: {
        currencies,
        sentiment,
        hodl
    },
});

export default store;
