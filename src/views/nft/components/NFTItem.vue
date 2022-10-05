<template>
  <a-list-item>
    <a-list-item-meta :description="item.description">
      <!--            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>-->
      <img :src="item.avatar" slot="avatar" style="width:90px" alt="">
      <a slot="title"><b>{{ item.title }} {{ item.id }}</b> </a>
      <a slot="description"><b>{{ item.price }}</b></a>
      <a slot="description" v-if="show_metadata"> ({{metadata.rank}} / {{metadata.totalRarity}})</a>

    </a-list-item-meta>
    <div slot="actions">
      <a @click="edit(item)">Edit</a>
    </div>
    <div slot="actions">
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item><a>Goto</a></a-menu-item>
        </a-menu>
        <a>Add
          <a-icon type="down"/>
        </a>
      </a-dropdown>
    </div>
    <div class="list-content">
      <div class="list-content-item">
        <span>Owner</span>
        <p><a :href="ethw_wallet_url + item.owner" target="_blank">{{ item.owner }}</a></p>
      </div>
      <div class="list-content-item">
        <span>LISTED TIME</span>
        <p>{{ item.startAt }}</p>
      </div>
      <div class="list-content-item">
        <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status"
                    style="width: 180px"/>
      </div>
    </div>
  </a-list-item>
</template>

<script>

import {GetMetadata} from '@/api/nft'

export default {
  name: 'NFTItem',
  props: {
    item: {
      type: Object,
      default: {
        id: "",
        title: "",
        avatar: "",
        description: '',
        owner: "",
        contract: "",
        startAt: "",
        progress: {
          value: 90
        },
        price: 0,
      }
    }
  },
  data() {
    return {
      metadata: {},
      ethw_wallet_url: process.env.VUE_APP_ETHW_WALLET_URL,
      show_metadata: false
    }
  },
  methods: {
    // Fetch list enable collections
    getMetadata () {
      console.log("Fetch metadata for " + this.item.id)
      GetMetadata("ethw", this.item.contract, this.item.id).then(response => {
        console.log(response)
        if (response.hasOwnProperty("success") && response.success) {
          this.metadata = response.data
          this.show_metadata = true
        }
      })
    },
  },
  watch: {
    item (val){
      this.getMetadata()
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, .45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;

  span {
    line-height: 20px;
  }

  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
