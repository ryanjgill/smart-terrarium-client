<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="relative">
        <div class="display-1 font-weight-light text-uppercase">Controls</div>
        <v-divider/>
      </v-flex>
      <v-flex xs12>
        <p
          class="title font-italic font-weight-medium pa-2 grey--text text--darken-2"
        >Manually override lighting and mister relays.</p>
      </v-flex>
    </v-layout>
    <v-layout column wrap>
      <v-flex xs6 mb-4>
        <v-switch
          v-model="lightsValue"
          color="indigo"
          class="switch"
          hide-details
          prepend-icon="highlight"
        >
          <span slot="label">
            Lights
            <b :class="lightsValue ? 'green--text' : ''">{{lightsValue ? 'ON' : 'OFF'}}</b>
          </span>
        </v-switch>
      </v-flex>
      <v-flex xs6>
        <v-switch
          v-model="misterValue"
          label="Mister"
          color="indigo"
          class="switch"
          hide-details
          prepend-icon="border_outer"
        >
          <span slot="label">
            Mister
            <b :class="misterValue ? 'green--text' : ''">{{misterValue ? 'ON' : 'OFF'}}</b>
          </span>
        </v-switch>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from "moment";
import EventForm from "../components/EventForm";
import EventsTable from "../components/EventsTable";

import Vue from "vue";
import VueChartkick from "vue-chartkick";

Vue.use(VueChartkick);

export default {
  components: {},
  name: "Controls",
  data() {
    return {
      socket: null,
      lightsValue: false,
      misterValue: false
    };
  },
  created() {
    this.socket = io("http://192.168.86.127:3030");
    this.socket.on("lightsValue", value => {
      this.lightsValue = value;
    });
    this.socket.on("misterValue", value => {
      this.misterValue = value;
    });
  },
  watch: {
    lightsValue(value) {
      this.socket.emit("toggleLights", value);
    },
    misterValue(value) {
      this.socket.emit("toggleMister", value);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .switch span {
  font-size: 2em;
}
</style>
