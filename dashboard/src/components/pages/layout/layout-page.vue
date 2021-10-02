<template>
    <div class="layout-container">
        <header class="page-header bg-primary">
            <button
                v-if="currentPage === 'infoview'"
                class="back-btn"
                @click="$router.push({ path: '/' })"
            >
                <i class="fa fa-angle-left fa-2x" />
            </button>
            <span class="page-title">VUE CRYPTO DASHBOARD</span>
            <button class="prices-btn" @click="$router.push({ path: '/' })">
                <span>Prices</span>
            </button>
            <button class="trades-btn" @click="$router.push({ path: '/hodl' })">
                <span>HODL</span>
            </button>
            <button class="trades-btn" @click="$router.push({ path: '/trades' })">
                <span>Trades</span>
            </button>
        </header>
        <div class="page-container">
            <transition name="fade" mode="out-in">
                <keep-alive include="dashboard">
                    <router-view />
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayoutPage',
    data() {
        return {
            currentPage: 'dashboard',
        };
    },
    watch: {
        $route: {
            deep: true,
            handler(page) {
                this.currentPage = page.name;
            },
        },
    },
};
</script>
