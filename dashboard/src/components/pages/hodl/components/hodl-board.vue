<template>
    <div class="board">
        <div v-for="value in hodlCurrencies" :key="value.symbol" class="card-block">
            <CurrencyCard :ticker="tickers[value.symbol] || {}" :info="value">
                <hodl-details
                    :ticker="tickers[value.symbol] || {}"
                    :amount-owned="value.amountOwned"
                    @change="updateAmountOwnedForHodl($event, value.symbol)"
                />
            </CurrencyCard>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CurrencyCard from '../../dashboard/components/currency-card.vue';
import HodlDetails from './hodl-details.vue';

export default {
    name: 'HodlBoard',
    components: {
        CurrencyCard,
        HodlDetails,
    },
    computed: {
        ...mapState('hodl', ['hodlCurrencies']),
        ...mapState('currencies', ['tickers']),
    },
    methods: {
        ...mapActions('hodl', ['updateAmountOwned']),
        updateAmountOwnedForHodl(value, symbol) {
            this.updateAmountOwned({ value: Number(value), symbol });
        },
    },
};
</script>
