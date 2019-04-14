<template>
  <v-layout v-if="user" row wrap class="relative">
    <v-snackbar v-model="showSaveNotification" :timeout="2400" top>
      {{ saveMessage }}
      <v-btn color="pink" flat @click="showSaveNotification = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-flex xs12 mb-2>
      <div class="display-1 font-weight-thin">Attributes</div>
      <v-divider></v-divider>
    </v-flex>
    <v-btn
      absolute
      dark
      fab
      top
      right
      small
      color="primary"
      @click="showForm = !showForm"
    >
      <v-icon v-if="!showForm">edit</v-icon>
      <v-icon v-else>close</v-icon>
    </v-btn>
    <v-flex xs6 pr-4>
      <v-text-field
        v-model="user.firstName"
        label="First Name"
        :disabled="disabled"
        @keyup.esc="user.firstName = ''"
      ></v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        v-model="user.lastName"
        label="Last Name"
        :disabled="disabled"
        @keyup.esc="user.lastName = ''"
      ></v-text-field>
    </v-flex>
    <v-flex xs6 pr-4>
      <v-text-field
        v-model="user.animalName"
        label="Animal Name"
        :disabled="disabled"
        @keyup.esc="user.animalName = ''"
      ></v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-menu
        v-model="showAnimalBdayPicker"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="user.animalBirthdate"
            label="Animal Birthdate"
            prepend-icon="event"
            readonly
            v-on="on"
            :disabled="disabled"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="user.animalBirthdate"
          @input="showAnimalBdayPicker = false"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6 pr-4>
      <v-text-field
        v-model="user.email"
        label="Email"
        :rules="[isEmailValid]"
        :disabled="disabled"
        @keyup.esc="user.email = ''"
      ></v-text-field>
    </v-flex>
    <v-flex v-if="showForm" xs12>
      <v-layout row align-start>
        <v-btn @click="updatedUser" color="primary">Save</v-btn>
        <v-btn @click="showForm = false">Cancel</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "UserAttributes",
  props: {
    user: Object
  },
  data() {
    return {
      saveMessage: "Save Successful.",
      showAnimalBdayPicker: false,
      showForm: false,
      showSaveNotification: false
    };
  },
  computed: {
    disabled() {
      return !this.showForm;
    },
    isEmailValid() {
      return (
        !this.user.email ||
        (this.user.email &&
          this.user.email.indexOf("@") > 0 &&
          this.user.email.length > 2) ||
        "Please provide a valid email."
      );
    },
    firstName() {
      return this.user ? this.user.firstName : "";
    },
    lastName() {
      return this.user ? this.user.lastName : "";
    },
    animalName() {
      return this.user ? this.user.animalName : "";
    },
    animalBirthdate() {
      return this.user ? this.user.animalBirthdate : "";
    },
    email() {
      return this.user ? this.user.email : "";
    },
    userPayload() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        animalName: this.animalName,
        animalBirthdate: this.animalBirthdate,
        email: this.email
      };
    }
  },
  methods: {
    updatedUser() {
      // save here and then show notification and flip edit
      console.log(this.userPayload);
      this.showSaveNotification = true;
      this.showForm = false;
    }
  }
};
</script>

<style lang="scss" scoped>
div.relative {
  position: relative;
}
</style>
