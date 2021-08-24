import Vue from 'vue';
import Vuex from 'vuex';

import currencies from './modules/currencies';
import sentiment from './modules/sentiment';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},

    getters: {},

    mutations: {},

    actions: {},

    modules: {
        currencies,
        sentiment,
    },
});

export default store;
