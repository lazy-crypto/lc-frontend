<template>
  <page-header-wrapper>
    <HolderChart></HolderChart>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="6" :xs="24">
          <info title="HOLDERS" :value="collection_data.total_owner" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="FLOOR PRICE" :value="collection_data.floor_price" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="TOTAL SUPPLY" :value="collection_data.total_quantity" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="VOLUME" :value="collection_data.total_volume" :bordered="true"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :title="collection_data.name">

      <div slot="extra">
        <a-radio-group v-model="selected_collection">
          <a-radio-button :value="collection_obj.contract" v-for="collection_obj in collections">{{collection_obj.name}}
          </a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;"/>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <NFTItem :item="item" v-for="(item, index) in data_assets"></NFTItem>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
    import TaskForm from './modules/TaskForm'
    import Info from './components/Info'
    import NFTItem from "@/views/nft/components/NFTItem";
    import {GetCollections, GetNFTAssetLists} from '@/api/nft'
    import NFTCollection from "@/domain/entities/NFTCollection"
    import HolderChart from "@/views/nft/components/HolderChart";
    // import EthWService from './../../infrastructures/'
    let collection_data;
    let data_assets;
    let chain;
    let selected_collection = '0x650c3cf4fae84c3a23a1d6f11712734efadbef5d';
    let collections = [
        {
            "contract ": "0x650c3cf4fae84c3a23a1d6f11712734efadbef5d",
            "name": "Beatles"
        },
    ];
    let ethw_wallet_url;

    export default {
        name: 'DashboardNFT',
        components: {
            TaskForm,
            Info,
            NFTItem,
            HolderChart
        },
        data() {
            return {
                // selector 
                selected_collection,
                collections,
                // current collection
                collection_data: {
                    name: "NFT",
                    symbol: "NFT",
                    total_owner: 0,
                    total_quantity: 0,
                    total_volume: 0
                },
                // assetLists
                data_assets: [],
                chain: {
                    name: "ETHW",
                    is_testnet: false
                },
                status: 'processing',
                ethw_wallet_url: process.env.VUE_APP_ETHW_WALLET_URL
            }
        },
        methods: {
            fetchDataNFT(token) {
                GetNFTAssetLists("ethw", token).then(response => {
                    if (response.hasOwnProperty('collection')) {
                        // Clear all old state, data
                        this.reset();

                        // this.collection_data = new NFTCollection(response.data.collection);
                        this.collection_data = response.collection;
                        response.assets.forEach((asset) => {
                            // asset.Image = asset.Image.replace("//", "")
                            let obj =
                                {
                                    id: asset.TokenId,
                                    title: asset.Name,
                                    avatar: asset.Image,
                                    description: '',
                                    owner: asset.Listing.from_wallet.address,
                                    contract: asset.Contract,
                                    startAt: asset.Listing.activated_at,
                                    progress: {
                                        value: 90
                                    },
                                    price: asset.Listing.price,
                                };

                            this.data_assets.push(obj);
                        });

                        this.chain = this.collection_data.chain;

                        this.$forceUpdate()
                    }
                })
            },
            selectContract(token) {
                this.fetchDataNFT("ethw", token)
            },
            
            // Fetch list enable collections
            getEnableCollections() {
                GetCollections().then(response => {
                    this.collections = []
                    Object.entries(response.collections).forEach(([key, value]) => {
                        this.collections.push({
                            contract: key,
                            name: value
                        })
                    })
                })
            },
            reset() {
                // this.collections = []
                this.collection_data = new NFTCollection();
                this.data_assets = [];
            },
            add() {
                console.log("Click add")
            },
            edit(record) {
                console.log('record', record)
            }
        },
        watch: {
            selected_collection (val) {
                console.log("Fetch new collection " + val)
                this.fetchDataNFT(val)
            }
        },
        created() {
            this.getEnableCollections()
            // Default fetch Beatles
            // https://www.nuwton.io/collection/EthereumPow/0x650c3cf4fae84c3a23a1d6f11712734efadbef5d
            this.fetchDataNFT("0x650c3cf4fae84c3a23a1d6f11712734efadbef5d")
        },
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
