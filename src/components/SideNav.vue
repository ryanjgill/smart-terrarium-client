<template>
  <v-list dense>
    <v-list-tile v-for="(link, index) in navLinks" :key="index" @click="routeTo(link.path)">
      <v-list-tile-action>
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import router from "../router.js";

export default {
  name: "SideNav",
  data() {
    return {
      navLinks: [
        {
          icon: "home",
          title: "Home",
          path: "/"
        },
        {
          icon: "insert_chart",
          title: "Measurements",
          path: "/measurements"
        },
        {
          icon: "calendar_today",
          title: "Events",
          path: "/events"
        },
        {
          icon: "settings_input_component",
          title: "Controls",
          path: "/controls"
        },
        {
          icon: "supervised_user_circle",
          title: "User",
          path: "/user"
        },
        {
          icon: "info",
          title: "About",
          path: "/about"
        }
      ]
    };
  },
  methods: {
    routeTo(path) {
      router.push(path);
    }
  }
};
</script>

<style>
ul.unstyled {
  list-style-type: none;
}
</style>
