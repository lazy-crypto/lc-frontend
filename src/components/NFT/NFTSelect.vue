<template>
        <a-select default-value="beatles" style="width: 120px!important;" @change="handleChange">
            <a-select-option :value="contract.contract" v-for="contract in nft_contracts" >
                {{contract.name}}
            </a-select-option>
        </a-select>
</template>

<script>
    export default {
        data() {
            return {
                nft_contracts: [
                    {name:"BEATLES", contract: "beatles"},
                    {name:"UNIWPUNK", contract: "uniwpunk"},
                ]
            };
        },
        methods: {
            handleChange(event) {
                this.$emit("handleChange", event)
            }
        }
    };
</script>