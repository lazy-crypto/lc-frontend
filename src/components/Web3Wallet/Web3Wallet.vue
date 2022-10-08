<template>
  <div id="w3-wallet">
    <vue-metamask ref="metamask" :initConnect="false" userMessage="msg"  @onComplete="onComplete"></vue-metamask>
    <a-button @click="connect">
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
      msg: "",
      wallet : {
        name: "metamask",
        address: "",
        type: "MAINNET",
        network_id: 0
      }
    }
  },
  methods: {
    connect() {
      this.$refs.metamask.init();
    },
    onComplete(val) {
      if (val.address && val.address !=="") {
        this.wallet.name = val.name
        this.wallet.address = val.address
        this.wallet.network_id = val.net_id
        this.wallet.type = val.type
        // Update to data store
        this.$store.dispatch("LoginWallet", this.wallet)
      } else {
        console.log(message)
      }
    }
  }
}
</script>