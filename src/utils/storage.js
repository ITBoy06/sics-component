const getCouponsFromStorage = () => {
    const items = JSON.parse(window.localStorage.getItem('sics-items'))

    if (!items) return {}

    return items
}

const removeCouponFromStorage = (couponId) => {
    const coupons = getCouponsFromStorage()
    const newCouponsObj = { ...coupons }

    delete newCouponsObj[couponId]

    saveCouponsObjInStorage(newCouponsObj)
}

const addCouponInStorage = (couponId, coupon) => {
    const coupons = getCouponsFromStorage()
    const newCouponsObj = { ...coupons }

    newCouponsObj[couponId] = coupon

    saveCouponsObjInStorage(newCouponsObj)
}

const checkCouponCampaignExistence = (campaignId) => {
    const coupons = getCouponsFromStorage()

    if (coupons[campaignId]) return coupons[campaignId]

    return null
}

const checkCouponCampaignExistenceForProduct = (productId) => {
    const coupons = getCouponsFromStorage()

    for (const id in coupons) {
        if (coupons[id].product.id === productId) {
            return coupons[id]
        }
    }

    return null
}

const saveCouponsObjInStorage = (couponsObj) => {
    window.localStorage.setItem('sics-items', JSON.stringify(couponsObj))
}

const getTokenFromCoupon = () => {
    const coupons = getCouponsFromStorage()
    return Object.values(coupons)[0].token
}

const deleteAllCouponsInStorage = () => {
    window.localStorage.setItem('sics-items', JSON.stringify({}))
}

export const storage = {
    getCouponsFromStorage,
    removeCouponFromStorage,
    addCouponInStorage,
    getTokenFromCoupon,
    deleteAllCouponsInStorage,
    checkCouponCampaignExistenceForProduct,
    checkCouponCampaignExistence
}
