import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import utils from './mixins/utils';
import store from './store';

Vue.mixin(utils);

//-- Initialize Google Analytics tracking.
Vue.use(VueAnalytics, {
  id: GA_TRACKING_ID,
  router
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
