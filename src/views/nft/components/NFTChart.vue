<template>
  <div>
    <apexchart type="line" height="350" :options="chartOptions" :series="series" v-if="enable"></apexchart>
  </div>
</template>

<script>
import {GetChartData} from '@/api/nft'
import VueApexCharts from 'vue-apexcharts'
import Vue from "vue";


export default {
  name: "NFTChart",
  data() {
    return {
      series: [{
        name: '',
        type: 'column',
        data: []
      }, {
        name: '',
        type: 'line',
        data: []
      }],
      enable: false,
      chartOptions: {
        // fill: {
        //   colors: '#0000ff',
        //   opacity: 0.9,
        //   type: 'gradient',
        //   fillTo: -20,
        // },
        chart: {
          redrawOnParentResize: true,
          height: "150px",
          type: 'line',
          zoom: {
            enabled: false,
            autoScaleYaxis: false,
            zoomedArea: {
              
            }
          }
        },
        stroke: {
          width: [3, 4]
        },
        title: {
          text: 'NFT'
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1]
        },

        markers: {
          size: 0,
          colors: 'rgba(213,167,167,0.73)',
          strokeColors: 'rgba(0,227,150,0.2)',
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        labels: [],
        // https://apexcharts.com/docs/options/xaxis/
        
        xaxis: {
          tickAmount: 5,
          type: "string",
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            show: true,
            rotate: 0,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0
          },
          tickPlacement: 'on'
        },
        yaxis: [{
          title: {
            text: 'Holders',
          },
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#b6b6b6',
              width: 1,
              dashArray: 0,
            },
          },

        }, {
          opposite: true,
          title: {
            text: 'Price'
          }
        }]
      },
    }
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
          let prices = []
          let holders = []
          let dataXAxis= []
          response.data.forEach((val) => {
            prices.push((val.price))
            holders.push(parseInt(val.holders))
            dataXAxis.push(Vue.moment(val.created).format('YY-MM-DD hh:mm:ss'))
          })
          
          this.series = [{
            name: 'Holders',
            type: 'line',
            data: holders
          }, {
            name: 'Price',
            type: 'line',
            data: prices
          }]
          
          Vue.set(this.chartOptions, "labels", dataXAxis)
          this.$forceUpdate()
          this.enable = true
        }
      })
    },
  },
  watch: {
    contract (val) {
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



