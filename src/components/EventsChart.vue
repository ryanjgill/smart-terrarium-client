<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["chartData", "options"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.chartData.map(_ => _.x),
      datasets: [
        {
          label: "Events",
          backgroundColor: "#f87979",
          data: this.chartData.map(_ => _.y)
        }
      ],
      options: this.options
    });
  }
};
</script>
