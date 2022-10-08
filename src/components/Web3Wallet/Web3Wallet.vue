<template>
  <div id="w3-wallet">
    <vue-metamask ref="metamask" :initConnect="false"></vue-metamask>
    <img src="/metamask.png" width="50" @click="connect">
  </div>
</template>
<script>
// https://web3js.readthedocs.io/en/v1.2.9/web3.html#web3-instance
import Metamask from "@/components/Metamask/Metamask";
export default {
  name: "W3Wallet",
  components: {
    "vue-metamask": Metamask
  },
  data() {
    return {
    }
  },
  methods: {
    connect(val) {
      this.$refs.metamask.init();
      console.log("Connect web3 wallet" + val)
    }
  }
}
</script>