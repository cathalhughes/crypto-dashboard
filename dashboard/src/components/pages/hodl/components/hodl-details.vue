<template>
    <div class="hodl-details">
        <div class="amount-owned">
            Amount Owned:
            <span class="value"
                ><v-text-field
                    :value="amountOwned"
                    type="number"
                    height="1rem"
                    hide-details
                    class="amount-owned--text-field"
                    step="0.1"
                    @input="updateAmountOwned"
            /></span>
        </div>
        <div>
            Price: <span class="value">{{ ticker.price }}</span>
        </div>
        <div>
            Value:
            <span v-if="ticker.price && amountOwned" class="value">{{
                amountOwned * ticker.price
            }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HodlDetails',
    props: {
        ticker: {
            type: Object,
            required: true,
        },
        amountOwned: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        updateAmountOwned(value) {
            this.$emit('change', value);
        },
    },
};
</script>

<style lang="scss" scoped>
.hodl-details {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;

    .amount-owned {
        display: flex;
        &--text-field {
            width: 4rem;
            padding-top: unset;
            padding-bottom: unset;
            padding-left: 0.5rem;
        }
    }

    .value {
        font-weight: 600;
    }
}
</style>
