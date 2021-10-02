<template>
    <div class="content-box">
        <selector @change="addCoinPair" />
        <HodlBoard />
        <button class="clear-btn" @click="clear">Clear All</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HodlBoard from './components/hodl-board.vue';
import { isEmpty } from '../../../util/Utility';
import { subscribeSymbol } from '../../../services/binance';
import Selector from '../../common-components/selector.vue';

export default {
    name: 'HodlDashboard',
    async mounted() {
        if (this.hodlCurrencies) {
            this.hodlCurrencies.forEach(currency => {
                subscribeSymbol(currency.symbol);
            });
        }
    },
    computed: {
        ...mapState('hodl', ['hodlCurrencies']),
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
            const { baseCurrency, quote } = event;
            if (!isEmpty(baseCurrency)) {
                const symbol = `${baseCurrency.value}${quote}`;
                subscribeSymbol(symbol);
                this.$store.commit('hodl/ADD_COIN_PAIR', {
                    symbol,
                    base: baseCurrency.value,
                    quote,
                    name: baseCurrency.name,
                    cid: baseCurrency.cid,
                });
            }
        },
    },
};
</script>

<style scoped>
.plus-icon {
    line-height: 22px;
}
</style>
