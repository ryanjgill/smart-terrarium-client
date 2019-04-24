<template>
  <v-data-table :headers="headers" :items="formattedEvents" class="elevation-1">
    <template v-slot:items="props">
      <tr @click="rowClick(props.item)" :class="props.item.type">
        <td>{{ props.item.type }}</td>
        <td>{{ props.item.startTime }}</td>
        <td>{{ props.item.endTime }}</td>
        <td>{{ props.item.duration }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";

export default {
  props: {
    events: Array
  },
  data() {
    return {
      headers: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Start Time",
          value: "startTime"
        },
        {
          text: "End Time",
          value: "endTime"
        },
        {
          text: "Duration",
          value: "duration"
        }
      ]
    };
  },
  computed: {
    formattedEvents() {
      return this.events.map(_ => {
        _.duration = this.getDuration(_.startTime, _.endTime);
        return _;
      });
    }
  },
  methods: {
    getDuration(start, end) {
      let m = moment(new Date());
      let year = m.get("year");
      let month = m.get("month") + 1;
      let day = 1;
      let startTimes = start.split(":");
      let endTimes = end.split(":");

      let startTime = moment([year, month, day, startTimes[0], startTimes[1]]);

      let endTime = moment([year, month, day, endTimes[0], endTimes[1]]);

      return endTime.to(startTime, true);
    },
    rowClick(row) {
      this.$emit("rowClick", row);
    }
  }
};
</script>

<style lang="scss" scoped>
tbody tr:hover {
  cursor: pointer;
}

tbody {
  tr.Lighting {
    background: #fff8e1; // amber-lighten-5
  }
  tr.Misting {
    background: #e1f5fe; // light-blue-lighten-5
  }
}
</style>
