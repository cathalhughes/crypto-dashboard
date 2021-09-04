<template>
  <div class="content-box">
    <selector @change="addCoinPair" />
    <CryptoBoard></CryptoBoard>
    <button class="clear-btn" @click="clear">Clear All</button>
  </div>
</template>
<script>
import coins from "@/assets/group.json";
import CryptoBoard from "./components/crypto-board.vue";
import { isEmpty } from "../../../util/Utility";
import { subscribeSymbol } from "../../../services/binance";
import { mapActions, mapState } from "vuex";
import Selector from '../../common-components/selector.vue';

export default {
  name: "dashboard",
  props: {
  },
  data() {
    return {
      currencyList: coins,
      quote: "USDT",
      baseCurrency: {},
    };
  },
  async mounted() {
    await this.fetchBitcoinSentiment();
    if (this.currencies) {
      this.currencies.forEach((currency) => {
        subscribeSymbol(currency.symbol);
      });
    }
  },
  computed: {
    ...mapState("currencies", ["currencies"]),
    ...mapState("sentiment", ["bitcoinSentiment"]),

    quoteOptions() {
      return Object.keys(coins);
    },
  },
  components: {
    CryptoBoard,
    Selector,
  },
  methods: {
    ...mapActions("sentiment", ["fetchBitcoinSentiment"]),

    resetBase() {
      this.baseCurrency = {};
    },
    clear() {
      localStorage.clear();
      location.reload();
    },
    addCoinPair(event) {
      console.log(event);
      const { baseCurrency, quote } = event;
      if (!isEmpty(baseCurrency)) {
        const symbol = `${baseCurrency.value}${quote}`;
        subscribeSymbol(symbol);
        this.$store.commit('currencies/ADD_COIN_PAIR', {
          symbol: symbol,
          base: baseCurrency.value,
          quote: quote,
          name: baseCurrency.name,
          cid: baseCurrency.cid,
        });
      }
    },
  },
};
</script>
