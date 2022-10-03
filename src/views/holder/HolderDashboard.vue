<template>
  <page-header-wrapper>
    <HolderChart></HolderChart>
  </page-header-wrapper>
</template>

<script>
import HolderChart from "@/views/ethw/components/HolderChart";

export default {
  name: 'DashboardNFT',
  components: {
    HolderChart
  },
  data() {
    return {}
  },
  methods: {},
  watch: {
    selected_collection(val) {
      console.log("Fetch new collection " + val)
      this.fetchDataNFT(val)
    }
  },
  created() {
  },
}
</script>

<style lang="less" scoped>
</style>
