import request from '@/utils/request_api'

const nftApi = {
  Collections: '/v1/nft/enable-collections',
  GetListAssets: '/v1/nft/sale-assets',
  GetMetadata: '/v1/nft/metadata',
}

/**
 * getCollections func
 * parameter: {
 * }
 * @param chain
 * @returns {*}
 */
export function GetCollections (chain = "ethw") {
  return request({
    url: nftApi.Collections,
    method: 'get',
    params: {
      chain: chain,
    }
  })
}

/**
 * getNFTAssetLists func
 * parameter: {
 * }
 * @param contract
 * @returns {*}
 */
export function GetNFTAssetLists (chain = "ethw", contract) {
  return request({
    url: nftApi.GetListAssets,
    method: 'get',
    params: {
      chain: chain,
      contract: contract,
    }
  })
}


/**
 * getNFTAssetLists func
 * parameter: {
 * }
 * @param contract
 * @returns {*}
 */
export function GetMetadata (chain = "ethw", contract, id) {
  return request({
    url: nftApi.GetMetadata,
    method: 'get',
    params: {
      chain: chain,
      contract: contract,
      id: id
    }
  })
}