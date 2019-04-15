<template>
  <v-layout v-if="user" row wrap>
    <v-flex xs6 pr-4>
      <AppBlockDisplay title="First Name" :value="firstName" />
    </v-flex>
    <v-flex xs6>
      <AppBlockDisplay title="Last Name" :value="lastName" />
    </v-flex>
    <v-flex xs6 pr-4>
      <AppBlockDisplay title="Animal Name" :value="animalName" />
    </v-flex>
    <v-flex xs6>
      <AppBlockDisplay title="Animal Birthdate" :value="animalBirthdate" />
    </v-flex>
    <v-flex xs6 pr-4>
      <AppBlockDisplay title="Email" :value="email" />
    </v-flex>
  </v-layout>
</template>

<script>
import AppBlockDisplay from "../components/AppBlockDisplay";

export default {
  name: "UserAttributesDisplay",
  components: {
    AppBlockDisplay
  },
  props: {
    user: Object
  },
  computed: {
    firstName() {
      return this.user ? this.user.firstName : "-";
    },
    lastName() {
      return this.user ? this.user.lastName : "-";
    },
    animalName() {
      return this.user ? this.user.animalName : "-";
    },
    animalBirthdate() {
      return this.user ? this.user.animalBirthdate : "-";
    },
    email() {
      return this.user ? this.user.email : "-";
    }
  }
};
</script>
