<template>
        <a-select default-value="beatles" style="width: 120px!important;" @change="handleChange">
            <a-select-option :value="contract" v-for="(collectionName, contract) in nft_contracts" >
                {{collectionName}}
            </a-select-option>
        </a-select>
</template>

<script>
    import EthWService from '../../domain/services/ethw-nft-service'
    export default {
        data() {
            return {
                nft_contracts: [{
                    // Default fetch Beatles
                    // https://www.nuwton.io/collection/EthereumPow/0x650c3cf4fae84c3a23a1d6f11712734efadbef5d
                    "0x650c3cf4fae84c3a23a1d6f11712734efadbef5d": "Beatles",
                }]
            };
        },
        created() {
            this.getConfig()
        },
        methods: {
            handleChange(event) {
                this.$emit("handleChange", event)
            },
            getConfig() {
                EthWService.getNFTCollections().then(response => {
                    if (response.data.hasOwnProperty('collections')) {
                        this.nft_contracts = response.data.collections
                    }
                })
            }
        }
    };
</script>