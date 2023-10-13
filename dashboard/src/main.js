import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

import Router from 'vue-router';
import './registerServiceWorker';
import './assets/vendor/font-awesome/css/font-awesome.css';
import './assets/app.scss';
import axios from 'axios';

import store from './store';
import router from './router';

import clickOutside from './directives/click-ouside';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Vuetify);
Vue.use(Router);
Vue.directive('click-outside', clickOutside);

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
