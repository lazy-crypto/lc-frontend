import http from '../../infrastructures/api-http'

export default {
    getNFTAssetNuwtonIO (nftName) {
        console.log(process.env.VUE_APP_API_URL);
        return http.get(`/ethw/nft/nuwton/assets?contract=` + nftName)
    },
    getNFTCollections () {
        return http.get(`/ethw/nft/collections`)
    }
}
