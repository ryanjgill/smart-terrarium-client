<template>
  <v-layout row wrap>
    <v-flex xs12 mb-2>
      <div class="display-1 font-weight-thin">Event Form</div>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs6 pr-4>
      <v-menu
        ref="menu1"
        v-model="showStarTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startTime"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startTime"
            label="Start Time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showStarTimePicker"
          v-model="startTime"
          full-width
          :color="pickerColor"
          :header-color="pickerColor"
          @click:minute="$refs.menu1.save(startTime)"
        ></v-time-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6>
      <v-menu
        ref="menu2"
        v-model="showEndTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endTime"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endTime"
            label="End Time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showEndTimePicker"
          v-model="endTime"
          full-width
          :color="pickerColor"
          :header-color="pickerColor"
          @click:minute="$refs.menu2.save(endTime)"
        ></v-time-picker>
      </v-menu>
    </v-flex>
    <v-flex xs6 pr-4>
      <v-select
        :items="['Misting', 'Lighting']"
        label="Type"
        v-model="type"
      ></v-select>
    </v-flex>
    <v-flex v-if="showForm" xs12>
      <v-layout row align-start>
        <v-btn @click="updateEvent" color="primary">Save</v-btn>
        <v-btn @click="clearSelection">Cancel</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    event: Object
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      type: null,
      showStarTimePicker: false,
      showEndTimePicker: false,
      showForm: false
    };
  },
  computed: {
    eventPayload() {
      return {
        startTime: this.startTime,
        endTime: this.endTime,
        type: this.type
      };
    },
    pickerColor() {
      return this.type === "Misting" ? "primary lighten-1" : "orange lighten-1";
    },
    saveMessage() {
      return "Event Saved.";
    }
  },
  methods: {
    clearForm() {
      this.startTime = null;
      this.endTime = null;
      this.type = null;
    },
    clearSelection() {
      this.clearForm();
      this.showForm = false;
      this.$emit("closeForm");
    },
    rowClick(row) {
      this.$emit("rowClick", row);
    },
    updateEvent() {
      console.log(this.eventPayload);
      this.$emit("eventSaved", "Event Saved.");
      this.clearSelection();
    }
  },
  watch: {
    event: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.startTime = newVal.startTime;
          this.endTime = newVal.endTime;
          this.type = newVal.type;
          this.showForm = true;
        }
      }
    }
  }
};
</script>
