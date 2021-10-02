<template>
    <div class="board">
        <div v-for="value in currencies" :key="value.symbol" class="card-block">
            <CurrencyCard :ticker="tickers[value.symbol] || {}" :info="value" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CurrencyCard from './currency-card.vue';

export default {
    name: 'CryptoBoard',
    components: {
        CurrencyCard,
    },
    computed: {
        ...mapState('currencies', ['tickers', 'currencies']),
    },
};
</script>
