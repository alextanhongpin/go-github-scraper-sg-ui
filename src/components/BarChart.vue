<script lang="ts">
import { Bar, mixins } from 'vue-chartjs'
export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
        /*
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
              const { index } = tooltipItems
              const { labels, datasets } = data
              const label = labels[index]
              const dataset = datasets[0]
              const value = dataset.data[index]
              const max = dataset.data.reduce((a, b) => a + b, 0)
              return `${label} ${((value / max) * 100).toFixed(
                2
              )}% (${value} repos)`
            }
          }
        }
        */
      }
    }
  },
  mounted () {
    // @ts-ignore
    this.renderChart(this.chartData, this.options)
  }
}
</script>
