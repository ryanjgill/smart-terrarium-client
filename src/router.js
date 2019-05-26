import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/measurements",
      name: "measurements",
      component: () => import("./views/Measurements.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./views/Events.vue")
    },
    {
      path: "/controls",
      name: "controls",
      component: () => import("./views/Controls.vue")
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./views/User.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    }
  ]
});
