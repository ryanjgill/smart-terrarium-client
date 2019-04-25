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

    <v-layout justify-space-between class="hidden-sm-and-down">
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
      measurementType: "temperature"
    };
  },
  created() {
    if (this.$route.query && this.$route.query.type) {
      this.measurementType = this.$route.query.type;
    }
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
          data: this.temperatureData
        },
        uvIndex: {
          color: colors.deepOrange.base,
          data: this.temperatureData
        },
        soilMoisture: {
          color: colors.lightGreen.base,
          data: this.temperatureData
        },
        misterWaterLevel: {
          color: colors.indigo.base,
          data: this.temperatureData
        },
        drainWaterLevel: {
          color: colors.brown.base,
          data: this.temperatureData
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
      return [
        {
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2019").getTime(),
            185,
            {
              min: 30,
              max: 90
            }
          )
        }
      ];
    },
    temperatureData() {
      return this.series;
    },
    chartOptionsArea() {
      return {
        chart: {
          id: "chartArea",
          toolbar: {
            autoSelected: "pan",
            show: false
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
            enabled: true,
            xaxis: {
              min: new Date("19 Jun 2019").getTime(),
              max: new Date("14 Aug 2019").getTime()
            }
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
    generateDayWiseTimeSeries: function(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
      }

      //console.log(series);
      return series;
    }
  }
};
</script>
