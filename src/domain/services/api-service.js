import http from 'infrastructures/api-http-auth'
import config from 'config/app.base'

export default {
    createCampaign (subject, desc, content, isPublished, isDisplay, createdBefore, createdAfter, regionType, provinceId, listShopCode, shopStationId, shopStatus, shopType, displayMode, popup, banner, detailImage, message) {
        return http.post(config.baseApiUrl + '/admin/campaign/create',
            {
                'subject': subject,
                'desc': desc,
                'content': content,
                'is_published': isPublished,
                'is_display': isDisplay,
                'created_before': createdBefore,
                'created_after': createdAfter,
                'region_type': regionType,
                'province_id': provinceId,
                'list_shop_code': listShopCode,
                'shop_station_id': shopStationId,
                'shop_status': shopStatus,
                'shop_type': shopType,
                'display_mode': displayMode,
                'pop_up': popup,
                'banner': banner,
                'detail_img': detailImage,
                'message': message
            })
    },

    countShopAward (data) {
        return http.get(config.baseApiUrl + `/admin/shop-award/count`)
    }
}
