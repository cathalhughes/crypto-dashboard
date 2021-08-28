import Vue from "vue";
import { cloneDeep } from "lodash";

const store = {
  namespaced: true,

  state: {
    hodlCurrencies: localStorage.getItem("vue-crypto-hodls-new")
      ? JSON.parse(localStorage.getItem("vue-crypto-hodls-new"))
      : [],
  },
  getters: {},
  mutations: {
    ADD_COIN_PAIR: (state, payload) => {
      console.log(payload, "state", "sure");
      const index = state.hodlCurrencies.findIndex(
        (s) => s.symbol === payload.symbol
      );
      if (index === -1) {
        state.hodlCurrencies.push(payload);
        localStorage.setItem(
          "vue-crypto-hodls-new",
          JSON.stringify(state.hodlCurrencies)
        );
      }
    },
    REMOVE_COIN_PAIR: (state, symbol) => {
      state.hodlCurrencies.splice(
        state.hodlCurrencies.findIndex((s) => s.symbol === symbol),
        1
      );
      localStorage.setItem(
        "vue-crypto-hodls-new",
        JSON.stringify(state.hodlCurrencies)
      );
    },

    updateAmountOwned(state, { value, symbol }) {
      const index = state.hodlCurrencies.findIndex((s) => s.symbol === symbol);
      const obj = cloneDeep(state.hodlCurrencies[index]);
      obj.amountOwned = value;
      Vue.set(state.hodlCurrencies, index, obj);
      localStorage.setItem(
        "vue-crypto-hodls-new",
        JSON.stringify(state.hodlCurrencies)
      );
    },
  },

  actions: {
    updateAmountOwned({ commit }, { value, symbol }) {
      commit("updateAmountOwned", { value, symbol });
    },
  },
};

export default store;
