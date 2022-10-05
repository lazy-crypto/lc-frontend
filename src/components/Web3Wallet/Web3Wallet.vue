<template>
  <div id="w3-wallet">
    <vue-metamask ref="metamask" :initConnect="false"></vue-metamask>
    <a-button @click="connect" @onComplete="onComplete">
      <img src="/metamask.png" width="15px" style="margin-right: 15px">  Login
    </a-button>
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
      user : {
        name: "",
        address: "",
        type: "MAINNET",
        network_id: 0
      }
    }
  },
  methods: {
    connect(val) {
      this.$refs.metamask.init();
    },
    onComplete(val) {
      console.log(val)
      if (val.address && val.address !=="") {
        this.user.name = val.address
        this.user.address = val.address
        this.user.network_id = val.netID
      } else {
        console.log(message)
      }
    }
  }
}
</script>