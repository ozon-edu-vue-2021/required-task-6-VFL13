import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import VueVirtualScroller from "vue-virtual-scroller";

import "normalize.css";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.use(VueVirtualScroller);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
