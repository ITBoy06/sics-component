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

const saveCouponsObjInStorage = (couponsObj) => {
  window.localStorage.setItem('sics-items', JSON.stringify(couponsObj))
}

export const storage = {
  getCouponsFromStorage,
  removeCouponFromStorage,
  addCouponInStorage
}
