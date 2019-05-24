<template>
  <div>
    <WelcomeBanner/>
    <v-layout row wrap ma-4>
      <v-flex
        xs12
        md6
        v-for="(sensor, i) in sensors"
        :key="i"
        class="sensorDisplay pb-4"
        :class="i % 2 === 0 ? 'pr-4' : ''"
        @click="routeToMeasurements(sensor.type)"
      >
        <div class="display-1 font-weight-light text-uppercase">{{ sensor.name }}</div>
        <v-divider/>
        <v-layout row wrap align-content-end>
          <v-flex xs8 class="sparkline">
            <div class="trend">
              <Trend :data="sensor.data" :gradient="sensor.gradient" auto-draw smooth/>
            </div>
            <span
              class="min font-weight-thin"
              :class="`${sensor.color}--text text--lighten-1`"
            >{{ sensor.min }}</span>
            <span
              class="max font-weight-thin"
              :class="`${sensor.color}--text text--darken-1`"
            >{{ sensor.max }}</span>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <span
              class="display-3 font-weight-thin"
              :class="`${sensor.color}--text`"
            >{{ sensor.data[sensor.data.length - 1] }}</span>
            <span
              class="uom display-1 font-weight-thin"
              :class="`${sensor.color}--text`"
            >{{ sensor.uom }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import WelcomeBanner from "../components/WelcomeBanner";
import Trend from "vuetrend";
import colors from "vuetify/es5/util/colors";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMockData(min, max, count) {
  let mockData = [];
  for (let x = 0; x < count; x++) {
    mockData.push(getRandomNumber(min, max));
  }

  return mockData;
}

export default {
  components: {
    Trend,
    WelcomeBanner
  },
  data() {
    return {
      allMeasurements: []
    };
  },
  created() {
    this.fetchSparklineData();
  },
  computed: {
    sensors() {
      return [
        {
          name: "Temperature",
          type: "temperature",
          data: this.temperatureSparkline,
          gradient: [
            colors.blue.lighten4,
            colors.blue.base,
            colors.blue.darken4
          ],
          color: "blue",
          uom: "°C",
          min: this.getMin(this.temperatureSparkline),
          max: this.getMax(this.temperatureSparkline)
        },
        {
          name: "Humidity",
          type: "humidity",
          data: this.humiditySparkline,
          gradient: [
            colors.deepPurple.lighten4,
            colors.deepPurple.base,
            colors.deepPurple.darken4
          ],
          color: "deep-purple",
          uom: "%",
          min: this.getMin(this.humiditySparkline),
          max: this.getMax(this.humiditySparkline)
        },
        {
          name: "UV Index",
          type: "uvIndex",
          data: this.uvIndexSparkline,
          gradient: [
            colors.deepOrange.lighten4,
            colors.deepOrange.base,
            colors.deepOrange.darken4
          ],
          color: "deep-orange",
          uom: "uv",
          min: this.getMin(this.uvIndexSparkline),
          max: this.getMax(this.uvIndexSparkline)
        },
        {
          name: "Soil Moisture",
          type: "soilMoisture",
          data: this.soilMoistureSparkline,
          gradient: [
            colors.lightGreen.lighten4,
            colors.lightGreen.base,
            colors.lightGreen.darken4
          ],
          color: "light-green",
          uom: "%",
          min: this.getMin(this.soilMoistureSparkline),
          max: this.getMax(this.soilMoistureSparkline)
        },
        {
          name: "Mister Water Level",
          type: "misterWaterLevel",
          data: this.misterWaterLevelSparkline,
          gradient: [
            colors.indigo.lighten4,
            colors.indigo.base,
            colors.indigo.darken4
          ],
          color: "indigo",
          uom: "%",
          min: this.getMin(this.misterWaterLevelSparkline),
          max: this.getMax(this.misterWaterLevelSparkline)
        },
        {
          name: "Drain Water Level",
          type: "drainWaterLevel",
          data: this.drainWaterLevelSparkline,
          gradient: [
            colors.brown.lighten4,
            colors.brown.base,
            colors.brown.darken4
          ],
          color: "brown",
          uom: "%",
          min: this.getMin(this.drainWaterLevelSparkline),
          max: this.getMax(this.drainWaterLevelSparkline)
        }
      ];
    },
    drainWaterLevelSparkline() {
      return this.allMeasurements.map(m => +m.drainWaterLevel);
    },
    humiditySparkline() {
      return this.allMeasurements.map(m => +m.humidity);
    },
    misterWaterLevelSparkline() {
      return this.allMeasurements.map(m => +m.misterWaterLevel);
    },
    soilMoistureSparkline() {
      return this.allMeasurements.map(
        m => +m.soilMoisture || getRandomNumber(20, 85)
      );
    },
    temperatureSparkline() {
      return this.allMeasurements.map(m => +m.temperature);
    },
    uvIndexSparkline() {
      return this.allMeasurements.map(m => +m.uvIndex);
    }
  },
  methods: {
    fetchSparklineData() {
      fetch("http://192.168.86.127:3030/sparklines")
        .then(response => response.json())
        .then(results => (this.allMeasurements = results));
    },
    getMin(values) {
      return values.reduce((out, temp, index) => {
        out = temp < out ? temp : out;
        return out;
      }, Infinity);
    },
    getMax(values) {
      return values.reduce((out, temp, index) => {
        out = temp > out ? temp : out;
        return out;
      }, 0);
    },
    routeToMeasurements(type) {
      this.$router.push({
        path: "/measurements",
        query: {
          type
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
div.sensorDisplay {
  &:hover {
    cursor: pointer;
  }
}

.sparkline {
  position: relative;

  .min,
  .max {
    position: absolute;
    left: 0;
    bottom: 1rem;
    font-size: 1rem;
  }

  .max {
    top: 0;
  }
}

@media screen and (max-width: 960px) {
  div.sensorDisplay.pr-4 {
    padding-right: 0 !important;
  }
}

span.uom {
  vertical-align: top;
}
</style>
