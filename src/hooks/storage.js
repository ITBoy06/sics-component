import { useReducer, useEffect, useCallback } from 'react'

// Utils
import { storage } from '../utils/storage'

const initialState = {
  fetching: true,
  coupons: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataLoaded':
      return { fetching: false, coupons: action.payload }
    case 'updateCoupons':
      return { coupons: action.payload }
    default:
      throw new Error()
  }
}

export const useStorage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const couponsFromStorage = storage.getCouponsFromStorage()

    // Setting items
    dispatch({ type: 'dataLoaded', payload: couponsFromStorage })
  }, [])

  const addCoupon = (couponId, coupon) => {
    // Add coupon in storage
    storage.addCouponInStorage(couponId, coupon)

    // Updating state
    let newCouponsObj = { ...state.coupons }
    newCouponsObj[couponId] = coupon

    dispatch({ type: 'updateCoupons', payload: newCouponsObj })
  }

  const removeCoupon = (couponId) => {
    // Removing coupon in storage
    storage.removeCouponFromStorage(couponId)

    // Updating state
    let newCouponsObj = { ...state.coupons }
    delete newCouponsObj[couponId]

    dispatch({ type: 'updateCoupons', payload: newCouponsObj })
  }

  return [state.fetching, state.coupons, { addCoupon, removeCoupon }]
}
