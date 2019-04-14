<template>
  <div>
    <WelcomeBanner />
    <v-layout row wrap>
      <v-flex
        xs6
        v-for="(sensor, i) in sensors"
        :key="i"
        :class="i % 2 === 0 ? 'pr-4' : ''"
      >
        <div class="display-1 font-weight-light text-uppercase">
          {{ sensor.name }}
        </div>
        <v-divider />
        <v-layout row wrap>
          <v-flex xs8>
            <div class="trend">
              <Trend
                :data="sensor.data"
                :gradient="sensor.gradient"
                auto-draw
                smooth
              />
            </div>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <span
              class="display-4 font-weight-thin"
              :class="`${sensor.color}--text`"
            >
              {{ sensor.data[sensor.data.length - 1] }}
            </span>
            <span
              class="uom display-1 font-weight-thin"
              :class="`${sensor.color}--text`"
              >{{ sensor.uom }}</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import WelcomeBanner from "../components/WelcomeBanner";
import Trend from "vuetrend";

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
          data: getMockData(65, 99, 30),
          gradient: ["#BBDEFB", "#2196F3", "#0D47A1"],
          color: "blue",
          uom: "°F"
        },
        {
          name: "Humidity",
          data: getMockData(0, 100, 30),
          gradient: ["#D1C4E9", "#673AB7", "#311B92"],
          color: "deep-purple",
          uom: "%"
        },
        {
          name: "UV Index",
          data: getMockData(1, 11, 30),
          gradient: ["#FFCCBC", "#FF5722", "#BF360C"],
          color: "deep-orange",
          uom: "uv"
        },
        {
          name: "Soil Moisture",
          data: getMockData(0, 100, 30),
          gradient: ["#DCEDC8", "#8BC34A", "#33691E"],
          color: "light-green",
          uom: "%"
        },
        {
          name: "Mister Water Level",
          data: getMockData(0, 100, 30),
          gradient: ["#C5CAE9", "#3F51B5", "#1A237E"],
          color: "indigo",
          uom: "%"
        },
        {
          name: "Drain Water Level",
          data: getMockData(0, 100, 30),
          gradient: ["#D7CCC8", "#795548", "#3E2723"],
          color: "brown",
          uom: "%"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
span.uom {
  vertical-align: top;
}
</style>
