<template>
  <v-list dense>
    <v-list-tile @click="routeTo('/')">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="routeTo('events')">
      <v-list-tile-action>
        <v-icon>calendar_today</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Events</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="routeTo('user')">
      <v-list-tile-action>
        <v-icon>supervised_user_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>User</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="routeTo('about')">
      <v-list-tile-action>
        <v-icon>info</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>About</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import router from "../router.js";

export default {
  name: "SideNav",
  data: () => ({}),
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
