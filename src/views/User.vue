<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="display-1 font-weight-light text-uppercase">
          User Information
        </div>
        <v-divider />
      </v-flex>
      <v-flex xs12>
        <p
          class="title font-italic font-weight-medium pa-2 grey--text text--darken-2 "
        >
          Personal information including pet name and contact information.
        </p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <UserAttributes :user="user" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "vue-router";
import UserAttributes from "../components/UserAttributes";

export default {
  components: {
    UserAttributes
  },
  name: "Base",
  data() {
    return {
      user: {
        firstName: "Ryan",
        lastName: "Gill",
        animalName: "Curie",
        animalBirthdate: "2013-12-08",
        email: "ryanjgill2@gmail.com"
      }
    };
  },
  methods: {
    routeTo(path) {
      router.push(path);
    }
  }
};
</script>
