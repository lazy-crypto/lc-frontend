<template>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="dataChart"></apexchart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');
import {GetChartData, GetMetadata} from '@/api/nft'
import VueApexCharts from 'vue-apexcharts'
import moment from "moment";
import Vue from "vue";
// import moment from 'moment-timezone'



let dataHolders = []
let dataPrices = []
let dataChart = [
  {
    name: 'Price',
    data: []
  },
  {
    name: 'Holders',
    data: []
  }
]


export default {
  name: "NFTChart",
  data() {
    return {
      dataHolders,
      dataPrices,
      dataChart,
      chartOptions: {
        chart: {
          type: 'line',
          height: 350
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },

        title: {
          text: 'NFT overview',
          align: 'left',
          style: {
            fontSize: '14px'
          }
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 4,
          floating: true,

          labels: {
            style: {
              colors: '#8e8da4',
            },
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true
          }
        },
        fill: {
          opacity: 0.5
        },
        tooltip: {
          x: {
            format: "YY-MM-DD hh:mm:ss",
          },
          fixed: {
            enabled: false,
            position: 'topRight'
          }
        },
        grid: {
          yaxis: {
            lines: {
              offsetX: -30
            }
          },
          padding: {
            left: 20
          }
        }
      },
    };
  },
  props: {
    contract: {
      type: String,
      default: ""
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
    getChartData (from, to) {
      GetChartData(this.chain, this.contract, from, to).then(response => {
        if (response.hasOwnProperty("success") && response.success) {
          response.data.forEach((val) => {
            this.dataPrices.push({
              x:val.created,
              y: val.price
            })
            this.dataHolders.push({
              x:val.created,
              y: val.holders
            })
          })
          this.dataChart = [
            {
              name: 'Price',
              data: this.dataPrices
            },
            {
              name: 'Holders',
              data: this.dataHolders
            }
          ]
        }
      })
    },
  },
  created() {
    let from = Vue.moment().subtract(12, 'hours').format('YYYY-MM-DD hh-mm-ss')

    console.log(from)
    let to = Vue.moment().format('YYYY-MM-DD hh-mm-ss')
    console.log(to)
    this.getChartData(from, to)
  }
};
</script>



