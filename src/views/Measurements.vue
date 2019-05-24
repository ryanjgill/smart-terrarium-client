<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="display-1 font-weight-light text-uppercase">Measurements</div>
        <v-divider/>
      </v-flex>
      <v-flex xs12>
        <p
          class="title font-italic font-weight-medium pa-2 grey--text text--darken-2"
        >Display a chart with measurements for this type of reading.</p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 md8>
        <v-select
          class="hidden-md-and-up"
          v-model="measurementType"
          :items="selectOptions"
          label="Select Measurement"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="hidden-sm-and-down">
      <v-btn-toggle v-model="measurementType" mandatory>
        <v-btn
          :value="type"
          v-for="(type, index) in chartTypesForButtons"
          :key="index"
          flat
        >{{ formatText(type) }}</v-btn>
      </v-btn-toggle>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <div id="chart1">
          <apexchart
            type="line"
            height="230"
            :options="chartOptionsArea"
            :series="selectedChartInfo.data"
          />
        </div>
        <div id="chart2">
          <apexchart
            type="area"
            height="130"
            :options="chartOptionsBrush"
            :series="selectedChartInfo.data"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import colors from "vuetify/es5/util/colors";

Vue.component("apexchart", VueApexCharts);

export default {
  name: "Measurements",
  data() {
    return {
      allMeasurements: [],
      measurementType: "temperature"
    };
  },
  created() {
    if (this.$route.query && this.$route.query.type) {
      this.measurementType = this.$route.query.type;
    }
    this.getAllMeasurements();
  },
  computed: {
    selectOptions() {
      return this.chartTypesForButtons.map(type => {
        return {
          text: this.formatText(type),
          value: type
        };
      });
    },
    chartTypes() {
      return {
        temperature: {
          color: colors.blue.base,
          data: this.temperatureData
        },
        humidity: {
          color: colors.deepPurple.base,
          data: this.humidityData
        },
        uvIndex: {
          color: colors.deepOrange.base,
          data: this.uvIndexData
        },
        soilMoisture: {
          color: colors.lightGreen.base,
          data: this.soilMoistureData
        },
        misterWaterLevel: {
          color: colors.indigo.base,
          data: this.misterWaterLevelData
        },
        drainWaterLevel: {
          color: colors.brown.base,
          data: this.drainWaterLevelData
        }
      };
    },
    chartTypesForButtons() {
      return Object.keys(this.chartTypes);
    },
    selectedChartInfo() {
      return {
        color: this.chartTypes[this.measurementType].color,
        data: this.chartTypes[this.measurementType].data
      };
    },
    series() {
      return [];
    },
    humidityData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.humidity]),
          name: "Humidity"
        }
      ];
    },
    misterWaterLevelData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.misterWaterLevel]),
          name: "Mister Water Level"
        }
      ];
    },
    soilMoistureData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.soilMoisture]),
          name: "Soil Moisture"
        }
      ];
    },
    drainWaterLevelData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.drainWaterLevel]),
          name: "Drain Water Level"
        }
      ];
    },
    temperatureData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.temperature]),
          name: "Temperature"
        }
      ];
    },
    uvIndexData() {
      return [
        {
          data: this.allMeasurements.map(m => [m.date, m.uvIndex]),
          name: "UV Index"
        }
      ];
    },
    chartOptionsArea() {
      return {
        chart: {
          id: "chartArea",
          toolbar: {
            autoSelected: "zoom",
            show: true
          }
        },
        colors: [this.selectedChartInfo.color],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime"
        }
      };
    },
    chartOptionsBrush() {
      return {
        chart: {
          id: "chartBrush",
          brush: {
            target: "chartArea",
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        colors: [this.selectedChartInfo.color],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      };
    }
  },
  methods: {
    formatText(text) {
      return text.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
        return str.toUpperCase();
      });
    },
    getAllMeasurements() {
      fetch("http://192.168.86.127:3030/measurements")
        .then(response => response.json())
        .then(results => (this.allMeasurements = results));
    }
  },
  watch: {
    measurementType(type) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type
        }
      });
    },
    "$route.query"(query) {
      this.measurementType = query.type || "temperature";
    }
  }
};
</script>
