import http from '../../infrastructures/api-http'

export default {
    getNFTAssetNuwtonIO (nftName) {
        console.log(process.env.VUE_APP_ETHW_API_URL);
        return http.get(`/ethw/nft/nuwton/assets?nft=` + nftName)
    }
}
