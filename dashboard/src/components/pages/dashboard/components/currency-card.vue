<template>
    <div class="coin-box" @dblclick.stop="openDetails">
        <div class="row no-gutters coin-info">
            <div class="col-7">
                <div class="font-weight-bold">{{ info.name }}</div>
                <div class="row no-gutters mt-1">
                    <div class="box-icon">
                        <span :style="{ backgroundImage: 'url(' + iconbase + ')' }" />
                    </div>
                    <div class="col text-left">
                        <div>
                            <b>{{ info.base }}</b
                            >/{{ info.quote }}
                        </div>
                        <div v-if="ticker.price" class="coin-price">
                            {{ ticker.price || ''
                            }}<span
                                style="font-size: x-small; font-weight: 700; padding-left: 3px"
                                >{{ info.quote }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="ticker.price"
                :class="[ticker.percent < 0 ? 'down' : 'up', 'col-5', 'text-right']"
            >
                <div class="coin-per">
                    <span class="indicator" /><span>{{ ticker.percent }}%</span>
                </div>
                <div class="coin-chg">
                    {{ parseFloat(ticker.chg).toFixed(info.quote === 'USDT' ? 3 : 8) }}
                </div>
                <div>
                    <span class="text-secondary">Vol:</span>
                    <span class="text-dark">{{ ticker.vol }}</span>
                </div>
            </div>
            <div
                v-click-outside="closeDropDown"
                class="dd-container"
                :class="[{ show: showDropDown }]"
            >
                <span role="button" class="menu-btn" @click.stop="onDropDown">
                    <i class="fa fa-ellipsis-v" aria-hidden="true" />
                </span>
                <div v-if="showDropDown" class="dd-menu">
                    <span class="dd-item" @click="openDetails">Open</span>
                    <span class="dd-item" @click="removeCard">Delete</span>
                </div>
            </div>
        </div>
        <slot>
            <div v-if="info.moonPrice & ticker.price" class="moon-info">
                <div class="prices">
                    <div
                        class="current-price"
                        :style="{
                            'margin-left': `${getMoonPercentage(ticker.price, info.moonPrice)}%`,
                        }"
                    >
                        {{ ticker.price }}
                    </div>
                    <div class="moon-price pr-1">
                        {{ info.moonPrice }}
                    </div>
                </div>

                <div class="emoji-slider">
                    <div
                        :style="{
                            'margin-left': `${getMoonPercentage(ticker.price, info.moonPrice)}%`,
                        }"
                    >
                        🚀
                    </div>
                    <div class="slider" />
                    <div class="pl-1">🌕</div>
                </div>
            </div>
            <div v-if="ticker.price" class="sparkline-chart">
                <Sparkline :cdata="ticker.price" :width="380" :height="info.moonPrice ? 50 : 90" />
            </div>
        </slot>
    </div>
</template>

<script>
import Sparkline from './sparkline.vue';
import { unSubscribeSymbol } from '../../../../services/binance';

export default {
    components: {
        Sparkline,
    },
    props: ['ticker', 'info', 'vuexModule'],
    data() {
        return {
            showDropDown: false,
        };
    },
    computed: {
        iconbase() {
            return `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.info.cid}.png`;
        },
    },
    methods: {
        onDropDown() {
            this.showDropDown = true;
        },
        removeCard() {
            console.log(this.vuexModule, 'in here');
            this.showDropDown = false;
            unSubscribeSymbol(this.info.symbol);
            this.$store.commit(
                `${this.vuexModule || 'currencies'}/REMOVE_COIN_PAIR`,
                this.info.symbol
            );
        },
        openDetails() {
            this.showDropDown = false;
        },
        closeDropDown() {
            this.showDropDown = false;
        },

        getMoonPercentage(price, moonPrice) {
            return (price / moonPrice) * 100;
        },
    },
};
</script>

<style scoped lang="scss"></style>
