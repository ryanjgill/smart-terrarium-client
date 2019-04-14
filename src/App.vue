<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <SideNav />
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title
        @click="routeTo('/')"
        class="headline text-uppercase hover-pointer"
      >
        <span>
          <img src="../src/assets/chameleon.png" alt="chameleon" class="logo" />
        </span>
        <span>Smart</span>
        <span class="font-weight-light pl-1">TERRARIUM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="green darken-2" class="hidden-xs-only" href="#/about">
        <span class="mr-2">About</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import router from "./router";

export default {
  components: {
    SideNav: () => import("./components/SideNav.vue")
  },
  name: "Base",
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    routeTo(path) {
      router.push(path);
    }
  }
};
</script>

<style lang="scss">
.v-toolbar__title:not(:first-child) {
  margin-left: 0;
}
.logo {
  width: 64px;
  vertical-align: middle;
  transform: scaleX(-1);
}
.hover-pointer:hover {
  cursor: pointer;
}
</style>
