<template>
  <div class="content-box">
    <selector @change="addCoinPair" />
    <HodlBoard />
    <button class="clear-btn" @click="clear">Clear All</button>
  </div>
</template>
<script>
import HodlBoard from "../hodl/components/hodl-board.vue";
import { isEmpty } from "../../../util/Utility";
import { subscribeSymbol } from "../../../services/binance";
import { mapState } from "vuex";
import Selector from "../../common-components/selector.vue";

export default {
  name: "HodlDashboard",
  async mounted() {
    if (this.hodlCurrencies) {
      this.hodlCurrencies.forEach((currency) => {
        subscribeSymbol(currency.symbol);
      });
    }
  },
  computed: {
    ...mapState("hodl", ["hodlCurrencies"]),
  },
  components: {
    HodlBoard,
    Selector,
  },
  methods: {
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
        this.$store.commit("hodl/ADD_COIN_PAIR", {
          symbol: symbol,
          base: baseCurrency.value,
          quote: quote,
          name: baseCurrency.name,
          cid: baseCurrency.cid,
        });
      }
			console.log(this.hodlCurrencies, 'added');
    },
  },
};
</script>
<style scoped>
.plus-icon {
  line-height: 22px;
}
</style>
