<template>
  <div>
    <WelcomeBanner/>
    <v-layout row wrap>
      <v-flex
        xs12
        md6
        v-for="(sensor, i) in sensors"
        :key="i"
        class="sensorDisplay"
        :class="i % 2 === 0 ? 'pr-4' : ''"
        @click="routeToMeasurements(sensor.type)"
      >
        <div class="display-1 font-weight-light text-uppercase">{{ sensor.name }}</div>
        <v-divider/>
        <v-layout row wrap align-content-end>
          <v-flex xs8>
            <div class="trend">
              <Trend :data="sensor.data" :gradient="sensor.gradient" auto-draw smooth/>
            </div>
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
      sensors: [
        {
          name: "Temperature",
          type: "temperature",
          data: getMockData(65, 99, 30),
          gradient: [
            colors.blue.lighten4,
            colors.blue.base,
            colors.blue.darken4
          ],
          color: "blue",
          uom: "°F"
        },
        {
          name: "Humidity",
          type: "humidity",
          data: getMockData(0, 100, 30),
          gradient: [
            colors.deepPurple.lighten4,
            colors.deepPurple.base,
            colors.deepPurple.darken4
          ],
          color: "deep-purple",
          uom: "%"
        },
        {
          name: "UV Index",
          type: "uvIndex",
          data: getMockData(1, 11, 30),
          gradient: [
            colors.deepOrange.lighten4,
            colors.deepOrange.base,
            colors.deepOrange.darken4
          ],
          color: "deep-orange",
          uom: "uv"
        },
        {
          name: "Soil Moisture",
          type: "soilMoisture",
          data: getMockData(0, 100, 30),
          gradient: [
            colors.lightGreen.lighten4,
            colors.lightGreen.base,
            colors.lightGreen.darken4
          ],
          color: "light-green",
          uom: "%"
        },
        {
          name: "Mister Water Level",
          type: "misterWaterLevel",
          data: getMockData(0, 100, 30),
          gradient: [
            colors.indigo.lighten4,
            colors.indigo.base,
            colors.indigo.darken4
          ],
          color: "indigo",
          uom: "%"
        },
        {
          name: "Drain Water Level",
          type: "drainWaterLevel",
          data: getMockData(0, 100, 30),
          gradient: [
            colors.brown.lighten4,
            colors.brown.base,
            colors.brown.darken4
          ],
          color: "brown",
          uom: "%"
        }
      ]
    };
  },
  methods: {
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
@media screen and (max-width: 960px) {
  div.sensorDisplay.pr-4 {
    padding-right: 0 !important;
  }
}

span.uom {
  vertical-align: top;
}
</style>
