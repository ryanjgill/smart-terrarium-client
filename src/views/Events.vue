<template>
  <v-container>
    <v-layout row wrap>
      <v-snackbar v-model="showSaveNotification" :timeout="2400" top>
        {{ saveMessage }}
        <v-btn color="pink" flat @click="showSaveNotification = false"
          >Close</v-btn
        >
      </v-snackbar>
      <v-flex xs12 class="relative">
        <div class="display-1 font-weight-light text-uppercase">Events</div>
        <v-divider />
        <v-btn
          absolute
          dark
          fab
          top
          right
          small
          color="primary form-fab"
          @click="toggleForm"
        >
          <v-icon v-if="!showForm" title="Add New Event">add</v-icon>
          <v-icon v-else title="Close Form">close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <p
          class="title font-italic font-weight-medium pa-2 grey--text text--darken-2"
        >
          Schedule lighting and misting events.
        </p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-fade-transition hide-on-leave>
        <v-flex xs12 mb-4 v-if="!showForm">
          <div class="display-1 font-weight-thin">
            Currently Scheduled Events
          </div>
          <v-divider class="mb-2"></v-divider>
          <p class="grey--text text--darken-1">
            Select an event to edit or click the event button to create a new
            event.
          </p>
          <EventsTable :events="events" @rowClick="eventSelected" />
          <timeline
            :data="timelineData"
            class="mt-4 timeline"
            :colors="chartColors"
          ></timeline>
        </v-flex>
      </v-fade-transition>
      <v-fade-transition hide-on-leave>
        <v-flex v-if="showForm" xs12>
          <EventForm
            :event="selectedEvent"
            @closeForm="closeForm"
            @eventSaved="eventSaved"
          />
        </v-flex>
      </v-fade-transition>
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
  components: {
    EventForm,
    EventsTable
  },
  name: "Events",
  data() {
    return {
      chartColors: ["#FFC107", "#03A9F4"],
      events: [
        {
          startTime: "06:15",
          endTime: "18:30",
          type: "Lighting"
        },
        {
          startTime: "06:30",
          endTime: "06:35",
          type: "Misting"
        },
        {
          startTime: "09:25",
          endTime: "09:30",
          type: "Misting"
        },
        {
          startTime: "12:40",
          endTime: "12:45",
          type: "Misting"
        },
        {
          startTime: "14:00",
          endTime: "14:05",
          type: "Misting"
        }
      ],
      saveMessage: "Event Saved.",
      selectedEvent: null,
      showForm: false,
      showSaveNotification: false
    };
  },
  computed: {
    LightingEvents() {
      return this.events.map(_ => _.type === "Lighting");
    },
    MistingEvents() {
      return this.events.map(_ => _.type === "Misting");
    },
    eventChartOptions() {
      return {
        responsive: true
      };
    },
    timelineData() {
      let m = moment(new Date());
      let year = m.get("year");
      let month = m.get("month");
      let day = 1;

      return this.events.map(event => {
        let startTimes = event.startTime.split(":");
        let endTimes = event.endTime.split(":");
        let startDate = new Date(
          year,
          month,
          day,
          startTimes[0],
          startTimes[1]
        );
        let endDate = new Date(year, month, day, endTimes[0], endTimes[1]);
        return [event.type, startDate, endDate];
      });
    }
  },
  methods: {
    closeForm() {
      this.selectedEvent = null;
      this.showForm = false;
    },
    eventSaved(message) {
      this.saveMessage = message;
      this.showSaveNotification = true;
    },
    eventSelected(event) {
      this.selectedEvent = event;
      this.showForm = true;
    },
    eventsChartData() {
      let m = moment(new Date());
      let year = m.get("year");
      let month = m.get("month");
      let day = 1;

      return this.events.map(_ => {
        let startTimes = _.startTime.split(":");

        return {
          x: new Date(year, month, day, +startTimes[0], +startTimes[1], 0),
          y: +_.startTime.split(":")[0]
        };
      });
    },
    toggleForm() {
      if (this.showForm) {
        this.closeForm();
      } else {
        this.selectedEvent = {
          startTime: "",
          endTime: "",
          type: "Misting"
        };
        this.showForm = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.relative {
  position: relative;
}

.timeline {
  height: 150px !important;
}

.form-fab.v-btn--top.v-btn--absolute.v-btn--small {
  top: 20px;
}
</style>
