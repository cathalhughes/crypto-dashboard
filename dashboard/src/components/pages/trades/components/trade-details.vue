<template>
  <div class="trade-details">
    <div class="amount-owned">
      Entry Price:
      <span class="value"
        ><v-text-field
          :value="entryPrice"
          type="number"
          height="0.5rem"
          hide-details
          class="amount-owned--text-field"
          step="0.1"
          @input="updateEntryPrice"
        ></v-text-field
      ></span>
    </div>
    <div class="amount-owned">
      Amount Purchased:
      <span class="value"
        ><v-text-field
          :value="amountOwned"
          type="number"
          height="0.5rem"
          hide-details
          class="amount-owned--text-field"
          step="0.1"
          @input="updateAmountOwned"
        ></v-text-field
      ></span>
    </div>
    <div>
      Cost: <span class="value">{{ entryPrice * amountOwned }}</span>
    </div>
    <div>
      Current Price: <span class="value">{{ ticker.price }}</span>
    </div>
    <div>
      Current Value: <span class="value">{{ (ticker.price * amountOwned) || 0 }}</span>
    </div>
    <div>
      Profit:
      <span v-if="ticker.price && amountOwned" class="value">
          {{ (amountOwned * ticker.price) - ( entryPrice * amountOwned) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HodlDetails",
  props: {
    ticker: {
      type: Object,
      required: true,
    },
    amountOwned: {
      type: Number,
      default: 0,
    },
    entryPrice: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    updateAmountOwned(value) {
      this.$emit('change', value);
    },
    updateEntryPrice(value) {
        this.$emit('entryPrice', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.trade-details {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  font-size: 0.7rem;

  .amount-owned {
    display: flex;
    &--text-field {
      width: 3.5rem;
      padding-top: unset;
      padding-bottom: unset;
      padding-left: 0.5rem;
    }
  }

  ::v-deep .v-text-field__slot {
    font-size: 0.7rem;
  }

  .value {
    font-weight: 600;
  }
}
</style>
