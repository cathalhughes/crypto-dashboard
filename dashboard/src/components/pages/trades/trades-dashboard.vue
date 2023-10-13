<template>
    <div class="content-box">
        <selector @change="addCoinPair" />
        <trades-board />
        <button class="clear-btn" @click="clear">Clear All</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isEmpty } from '../../../util/Utility';
import { subscribeSymbol } from '../../../services/binance';
import Selector from '../../common-components/selector.vue';
import TradesBoard from './components/trades-board.vue';

export default {
    name: 'TradesDashboard',
    async mounted() {
        if (this.trades) {
            this.trades.forEach((currency) => {
                subscribeSymbol(currency.symbol);
            });
        }
    },
    computed: {
        ...mapState('trades', ['trades']),
    },
    components: {
        Selector,
        TradesBoard,
    },
    methods: {
        clear() {
            localStorage.removeItem('vue-crypto-trades-new');
            location.reload();
        },
        addCoinPair(event) {
            const { baseCurrency, quote } = event;
            if (!isEmpty(baseCurrency)) {
                const symbol = `${baseCurrency.value}${quote}`;
                subscribeSymbol(symbol);
                this.$store.commit('trades/ADD_COIN_PAIR', {
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
