<template>
  <div class="board">
    <div class="card-block" v-for="value in trades" :key="value.symbol">
      <CurrencyCard :ticker="tickers[value.symbol] || {}" :info="value">
        <trade-details
          :ticker="tickers[value.symbol] || {}"
          :amount-owned="value.amountOwned || 0"
          :entry-price="value.entryPrice || 0"
          @change="updateFieldForTrades($event, value.symbol, 'amountOwned')"
          @entryPrice="updateFieldForTrades($event, value.symbol, 'entryPrice')"
        />
      </CurrencyCard>
    </div>
  </div>
</template>
<script>
import CurrencyCard from "../../dashboard/components/currency-card.vue";
import { mapActions, mapState } from "vuex";
import TradeDetails from './trade-details.vue';
export default {
  name: "TradesBoard",
  components: {
    CurrencyCard,
    TradeDetails,
  },
  computed: {
    ...mapState("trades", ["trades"]),
    ...mapState("currencies", ["tickers"]),
  },
  methods: {
    ...mapActions('trades', ['updateField']),
    updateFieldForTrades(value, symbol, field) {
      this.updateField({ value: Number(value), symbol, field })
    }
  }
};
</script>
