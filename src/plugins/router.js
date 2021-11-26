import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Table",
    component: () => import(/* webpackChunkName: "about" */ "../pages/Table"),
  },
  {
    path: "/table-fc",
    name: "TableFC",
    component: () => import(/* webpackChunkName: "about" */ "../pages/TableFC"),
  },
  {
    path: "*",
    beforeEnter: (to, from, next) => {
      next("/");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
