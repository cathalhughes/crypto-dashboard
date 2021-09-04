import Vue from "vue";
import { cloneDeep } from "lodash";

const store = {
  namespaced: true,

  state: {
    trades: localStorage.getItem("vue-crypto-trades-new")
      ? JSON.parse(localStorage.getItem("vue-crypto-trades-new"))
      : [],
  },
  getters: {},
  mutations: {
    ADD_COIN_PAIR: (state, payload) => {
      const index = state.trades.findIndex(
        (s) => s.symbol === payload.symbol
      );
      if (index === -1) {
        state.trades.push(payload);
        localStorage.setItem(
          "vue-crypto-trades-new",
          JSON.stringify(state.trades)
        );
      }
    },
    REMOVE_COIN_PAIR: (state, symbol) => {
      state.trades.splice(
        state.trades.findIndex((s) => s.symbol === symbol),
        1
      );
      localStorage.setItem(
        "vue-crypto-trades-new",
        JSON.stringify(state.trades)
      );
    },

    updateField(state, { value, symbol, field }) {
      const index = state.trades.findIndex((s) => s.symbol === symbol);
      const obj = cloneDeep(state.trades[index]);
      obj[field] = value;
      Vue.set(state.trades, index, obj);
      localStorage.setItem(
        "vue-crypto-trades-new",
        JSON.stringify(state.trades)
      );
    },
  },

  actions: {
    updateField({ commit }, { value, symbol, field }) {
      commit("updateField", { value, symbol, field });
    },
  },
};

export default store;
