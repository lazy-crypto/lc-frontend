<template>
  <div >
    <div id="chart-line2" v-if="enable">
      <apexchart type="line" height="230" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div id="chart-line" v-if="enable">
      <apexchart type="area" height="130" :options="chartOptionsLine" :series="seriesLine"></apexchart>
    </div>
  </div>
</template>

<script>
import {GetChartData} from '@/api/nft'
import VueApexCharts from 'vue-apexcharts'
import Vue from "vue";


export default {
  name: "BrushChart",
  data() {
    return {
      series: [{
        data: data
      }],
      seriesLine: [{
        data: data
      }],
      enable: false,
      chartOptions: {
        chart: {
          id: 'chart2',
          type: 'line',
          height: 230,
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['#546E7A'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        }
      },
      chartOptionsLine: {
        chart: {
          id: 'chart1',
          height: 130,
          type: 'area',
          brush:{
            target: 'chart2',
            enabled: true
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('01 Oct 2022').getTime(),
              max: new Date('05 Oct 2022').getTime()
            }
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          }
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      },
    }
  },
  props: {
    contract: {
      type: String,
      default: ""
    },
    total_supply: {
      type: Number,
      default: 10000
    },
    chain: {
      type: String,
      default: "ethw"
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  methods: {
    // Fetch list enable collections
    getChartData(from, to) {
      GetChartData(this.chain, this.contract, from, to).then(response => {
        if (response.hasOwnProperty("success") && response.success) {
          let prices = []
          let holders = []
          let dataXAxis = []
          response.data.forEach((val) => {
            prices.push((val.price))
            holders.push(parseInt(val.holders))
            dataXAxis.push(Vue.moment(val.created).format('YY-MM-DD hh:mm:ss'))
          })

          this.series = [{
            data: prices
          }]
          this.seriesLine = [{
            data: holders
          }]
          Vue.set(this.chartOptions, "labels", dataXAxis)
          this.$forceUpdate()
          this.enable = true
        }
      })
    },
  },
  watch: {
    contract(val) {
      console.log("Re-draw chart")
      let from = Vue.moment().subtract(7.5, 'hours').format('YYYY-MM-DD hh:mm:ss')
      let to = Vue.moment().subtract(7, 'hours').format('YYYY-MM-DD hh:mm:ss')
      this.getChartData(from, to)
    }
  },
  created() {
    let from = Vue.moment().subtract(7.5, 'hours').format('YYYY-MM-DD hh:mm:ss')
    let to = Vue.moment().subtract(7, 'hours').format('YYYY-MM-DD hh:mm:ss')
    console.log(to)
    this.getChartData(from, to)
  }
};
</script>



