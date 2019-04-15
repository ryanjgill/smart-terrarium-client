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
      <v-snackbar v-model="showSaveNotification" :timeout="2400" top>
        User Saved.
        <v-btn color="pink" flat @click="showSaveNotification = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-flex xs12 mb-2 class="relative">
        <div class="display-1 font-weight-thin">Attributes</div>
        <v-divider></v-divider>
        <v-btn
          absolute
          dark
          fab
          top
          right
          small
          color="primary form-fab"
          @click="showForm = !showForm"
        >
          <v-icon v-if="!showForm">edit</v-icon>
          <v-icon v-else>close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-fade-transition hide-on-leave>
          <UserAttributesDisplay v-if="!showForm" :user="user" />
        </v-fade-transition>
        <v-fade-transition hide-on-leave>
          <UserAttributesForm
            v-if="showForm"
            :user="user"
            @showSaveNotification="showSaveNotification = true"
            @closeForm="showForm = false"
          />
        </v-fade-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "vue-router";
import UserAttributesForm from "../components/UserAttributesForm";
import UserAttributesDisplay from "../components/UserAttributesDisplay";

export default {
  components: {
    UserAttributesForm,
    UserAttributesDisplay
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
      },
      showForm: false,
      showSaveNotification: false
    };
  },
  methods: {
    routeTo(path) {
      router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}

.form-fab.v-btn--top.v-btn--absolute.v-btn--small {
  top: 20px;
}
</style>
