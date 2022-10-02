import request from '@/utils/request_api'

const ethwApi = {
  Collections: '/ethw/nft/collections',
  GetListAssets: '/ethw/nft/nuwton/assets',
}

/**
 * getCollections func
 * parameter: {
 * }
 * @param parameter
 * @returns {*}
 */
export function GetCollections (parameter) {
  return request({
    url: ethwApi.Collections,
    method: 'get'
  })
}

/**
 * getNFTAssetLists func
 * parameter: {
 * }
 * @param contract
 * @returns {*}
 */
export function GetNFTAssetLists (contract) {
  return request({
    url: ethwApi.GetListAssets,
    method: 'get',
    params: {
      contract: contract
    }
  })
}