<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="display-1 font-weight-light text-uppercase">
          Measurements
        </div>
        <v-divider />
      </v-flex>
      <v-flex xs12>
        <p
          class="title font-italic font-weight-medium pa-2 grey--text text--darken-2 "
        >
          Display a chart with measurements for this type of reading.
        </p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <div id="chart1">
          <apexchart
            type="line"
            height="230"
            :options="chartOptionsArea"
            :series="series"
          />
        </div>
        <div id="chart2">
          <apexchart
            type="area"
            height="130"
            :options="chartOptionsBrush"
            :series="series"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from 'vue';
import VueApexCharts from "vue-apexcharts";

 Vue.component('apexchart', VueApexCharts)
 
export default {
  name: "Measurements",
  data() {
    return {
      type: ""
    };
  },
  computed: {
    series() {
      return [
        {
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017").getTime(),
            185,
            {
              min: 30,
              max: 90
            }
          )
        }
      ];
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
        colors: ["#546E7A"],
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
              min: new Date("19 Jun 2017").getTime(),
              max: new Date("14 Aug 2017").getTime()
            }
          }
        },
        colors: ["#008FFB"],
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

      console.log(series);
      return series;
    }
  }
};
</script>
