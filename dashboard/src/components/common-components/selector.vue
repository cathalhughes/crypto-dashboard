<template>
  <div class="menu-bar">
    <div class="selector">
      <v-select
        id="base"
        :options="currencyList[quote]['pairs']"
        :clearable="false"
        v-model="baseCurrency"
        placeholder="Select Token"
        class="pt-2"
      ></v-select>
      <span class="slash">/</span>
      <v-select
        id="quote"
        :options="quoteOptions"
        :searchable="false"
        :clearable="false"
        v-model="quote"
        @input="resetBase"
        style="width: 100px"
        class="pt-2"
      ></v-select>
      <button class="add-btn" @click="change">
        <i class="fa fa-plus fa-lg plus-icon" aria-hidden="true"></i>
      </button>
    </div>
    <div class="sentiment">
      <span v-if="isHodlView">Total Portfolio: {{ totalPortfolio }}</span>
      <span v-else-if="isTradesView"
        >Total Trade Profit: {{ totalTradeProfit }}</span
      >
      <span v-else>Bitcoin Sentiment: {{ bitcoinSentiment }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { round, get } from "lodash";
import vSelect from "vue-select";
import coins from "@/assets/group.json";

export default {
  name: "selector",
  data() {
    return {
      currencyList: coins,
      quote: "USDT",
      baseCurrency: {},
    };
  },
  computed: {
    ...mapState("sentiment", ["bitcoinSentiment"]),
    ...mapState("hodl", ["hodlCurrencies"]),
    ...mapState("trades", ["trades"]),
    ...mapState("currencies", ["tickers"]),
    quoteOptions() {
      return Object.keys(coins);
    },
    totalPortfolio() {
      const total = this.hodlCurrencies.reduce((acc, hc) => {
        acc +=
          get(this.tickers, [hc.symbol, "price"], 0) *
          get(hc, "amountOwned", 0);
        return acc;
      }, 0);
      return round(total, 2);
    },
    totalTradeProfit() {
      const total = this.trades.reduce((acc, trade) => {
        const cost = get(trade, "entryPrice", 0) * get(trade, "amountOwned", 0);
        const currentValue =
          get(trade, "amountOwned", 0) *
          get(this.tickers, [trade.symbol, "price"], 0);
        acc += currentValue - cost;
        return acc;
      }, 0);
      return round(total, 2);
    },
    isHodlView() {
      return this.$route.path === "/hodl";
    },
    isTradesView() {
      return this.$route.path === "/trades";
    },
  },
  async created() {
    await this.fetchBitcoinSentiment();
  },
  components: {
    vSelect,
  },
  methods: {
    ...mapActions("sentiment", ["fetchBitcoinSentiment"]),
    resetBase() {
      this.baseCurrency = {};
    },
    change() {
      this.$emit("change", {
        baseCurrency: this.baseCurrency,
        quote: this.quote,
      });
    },
  },
};
</script>
<style scoped>
.plus-icon {
  line-height: 22px !important;
}
</style>
