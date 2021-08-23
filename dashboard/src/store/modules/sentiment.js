import axios from "axios";
import to from "await-to-js";
import { last } from "lodash";

const store = {
  namespaced: true,

  state: {
    bitcoinSentiment: null,
  },
  mutations: {
    setBitcoinSentiment(state, bitcoinSentiment) {
      state.bitcoinSentiment = bitcoinSentiment;
    },
  },
  actions: {
    async fetchBitcoinSentiment({ commit }) {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const day = currentDate.getDate();
      const dayString = day < 10 ? `0${day}` : `${day}`;
      const hour = currentDate.getHours() - 1;
      const hourString = hour < 10 ? `0${hour}` : `${hour}`;
      const urlString = `${currentDate.getFullYear()}-${monthString}-${dayString}_${hourString}`;
      const [err, res] = await to(
        axios.get(
          `https://api.senticrypt.com/v1/history/bitcoin-${urlString}.json`
        )
      );
      if (err) throw new Error(err.message);
      const data = res.data;
      const mean = last(data).mean;
      const sentimentValue = mean > 0 ? 'Positive' : 'Negative'
      commit("setBitcoinSentiment", sentimentValue);
    },
  },
};

export default store;
