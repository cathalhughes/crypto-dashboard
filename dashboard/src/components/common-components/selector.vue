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
    <div class="sentiment-text">
      <span class="sentiment">Bitcoin Sentiment: {{ bitcoinSentiment }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
    quoteOptions() {
      return Object.keys(coins);
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
  line-height: 22px;
}
</style>